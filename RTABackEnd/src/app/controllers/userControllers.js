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

/**
 * Router to list all projects on database
 * Endpoint - /auth/
 */
/* router.get("/projects", async (req, res) => {
  try {
    // Const to find all projects previously saved
    // .populate() -> fill the blanks in our response
    console.log('id user:', req.userId);
    const projects = await Project.find();
    const projectsOfUser = [];
    projects.map(project => {
      if (project.user._id == req.userId) {
        projectsOfUser.push(project);
      }
    })


    return res.send({ projectsOfUser });
  } catch (err) {
    return res.status(400).send({ error: "Error loading projects" });
  }
}); */

//info
module.exports = app => app.use("/home", router);
