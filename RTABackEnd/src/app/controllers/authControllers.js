const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");

// Const used to define our routes
const router = express.Router();

/**
 * Function to register an user.
 * Endpoint - /auth/register
 */
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    // Condition to verify if the user
    // already exists in our database
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "User already exists" });

    // All params to register (email and password)
    // inside req.body
    const user = await User.create(req.body);

    // Setting the password to undefined
    // preventing res response with that
    user.password = undefined;

    // Here is where we return that everything is okay
    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    // In case of something wrong at register route
    return res.status(400).send({ error: "Registration failed" });
  }
});

/**
 * Function to authenticate an user.
 * Endpoint - /auth/authenticate
 */
router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  // ('+password') part is to get user password.
  // At first we decide to hide, but here's required
  // to authenticate the user.
  const user = await User.findOne({ email }).select("+password");

  // If the returned user is not in the database, then we
  // have to answer that we were uncapable to find that user.
  checkIfUserExists(user, res);

  // Comparing if the passwords match
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Invalid password" });

  // Setting the password as undefined one more time to
  // make the response more reliable.
  user.password = undefined;

  // User response after authentication
  res.send({ user, token: generateToken({ id: user.id }) });
});

/**
 * Function to request an new password.
 * Endpoint - /auth/forgot_password
 */
router.post("/forgot_password", async (req, res) => {
  const { email } = req.body;
  try {
    // catch the user email
    const user = await User.findOne({ email });

    // If that email do not exists, then we give an error message
    checkIfUserExists(user, res);

    // Setting unique token to send (token as password)
    // developer mode
    const token = crypto.randomBytes(20).toString("hex");

    // Setting actual date for token,
    // adding one hour
    const now = new Date();
    now.setHours(now.getHours() + 1);

    // Here is where we update the user
    // resetToken and resetExpires
    // It'll give us an unique and
    // expiration time for token
    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    });

    // sending mail to the user who
    // requested the password (token)
    // Passing template as ./resourcers/mail/auth.html
    mailer.sendMail(
      {
        to: email,
        from: "reubertfernandes@gmail.com",
        template: "auth",
        context: { token }
      },
      err => {
        console.log(err);
        if (err)
          return res
            .status(400)
            .send({ error: "Cannot send forgot password email" });

        return res.send();
      }
    );
  } catch (err) {
    res
      .status(400)
      .send({ error: "Error on forgot password, try again later, tks!" });
  }
});

/**
 * Function to reset an password.
 * Endpoint - /auth/reset_password
 */
router.post("/reset_password", async (req, res) => {
  const { email, token, password } = req.body;
  try {
    // Finding for user, passwordResetToken
    // and passwordResetExpires
    const user = await User.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );

    // Again, we should test if the user exists on DB
    checkIfUserExists(user, res);

    // Checking if the passed token is equals to
    // that one on database (passwordResetToken)
    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: "Invalid token" });

    // Setting new actual time
    const now = new Date();

    // Comparing the actual time to the
    // token expiration time, to make sure that's
    // not invalid
    if (now > user.passwordResetExpires)
      return res
        .status(400)
        .send({ error: "Token expired, generate a new one." });

    // Passing to user schema the new password
    user.password = password;

    // Waiting for save it on DB
    await user.save();

    res.send();
  } catch (err) {
    res.status(400).send({ error: "Cannot reset password, try again." });
  }
});

/**
 * Function to generate an token.
 */
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86480
  });
}

function checkIfUserExists(user, res) {
  if (!user) return res.status(400).send({ error: "User not found" });
}

module.exports = app => app.use("/auth", router);
