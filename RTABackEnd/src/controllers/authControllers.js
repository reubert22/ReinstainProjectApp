const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

/**
 * Const used to define our routes
 */
const router = express.Router();

// Here we define the token for each user
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86480
  });
}

/**
 * Function to register an user
 * endpoint - /auth/register
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
 * Authentication route
 */
router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  // ('+password') part is to get user password.
  // At first we decide to hide, but here's required
  // to authenticate the user.
  const user = await User.findOne({ email }).select("+password");

  // If the returned user is not in the database, then we
  // have to answer that we were uncapable to find that user.
  if (!user) return res.status(400).send({ error: "User not found" });

  // Comparing if the passwords match
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Invalid password" });

  // Setting the password as undefined one more time to
  // make the response more reliable.
  user.password = undefined;

  // User response after authentication
  res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = app => app.use("/auth", router);
