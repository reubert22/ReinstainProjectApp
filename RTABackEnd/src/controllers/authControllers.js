const express = require("express");
const User = require("../models/User");

/**
 * Const used to define our routes
 */
const router = express.Router();

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

    // All params
    const user = await User.create(req.body);

    // Setting the password to undefined
    // to prevent and improve security
    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    // In case of failed
    return res.status(400).send({ error: "Registration failed" });
  }
});

module.exports = app => app.use("/auth", router);
