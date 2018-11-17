const express = require("express");
const authMiddleware = require("../middlewares/auth");

// Const used to define our routes
const router = express.Router();

/**
 * Intercepting the /auth/authentication route
 * to check if the token is okay, then
 * redirect the user to router.get("/") route,
 * where it can be our home screen or some other
 * route
 */
router.use(authMiddleware);

/**
 * Here is where the route we're gonna
 * redirect after authentication succeed
 */
router.get("/", (req, res) => {
  res.send({ ok: true, user: req.userId });
});

module.exports = app => app.use("/projects", router);
