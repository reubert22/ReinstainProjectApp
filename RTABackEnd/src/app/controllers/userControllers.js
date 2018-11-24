const express = require("express");
const authMiddleware = require("../middlewares/auth");


// Consts to import our Schemas
const Project = require("../models/project");

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


//info
module.exports = app => app.use("/home", router);
