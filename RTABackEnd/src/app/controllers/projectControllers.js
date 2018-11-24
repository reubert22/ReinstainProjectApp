const express = require("express");
const authMiddleware = require("../middlewares/auth");

// Consts to import our Schemas
const Project = require("../models/project");
const Task = require("../models/task");

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
router.get("/", async (req, res) => {
  try {
    // Const to find all projects previously saved
    // .populate() -> fill the blanks in our response
    const projects = await Project.find()
      .populate(["user", "tasks"]);

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: "Error loading projects" });
  }
});

/**
 * Router to list one project on database
 * based on projectId that we're passing
 * as param
 * Endpoint - /projects/list/project/:projectId
 */
router.get("/list/project/:projectId", async (req, res) => {
  try {
    // const to keep our object
    // Passing projectId and populating it with attributes
    const project = await Project.findById(req.params.projectId)
      .populate(["user", "tasks"]);

    return res.send({ project });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error loading project" });
  }
});

/**
 * Router to create an project
 * Endpoint - /projects/
 */
router.post("/", async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    // Here we pass title, description and
    // make an relation 1 to N represented
    // by user: req.userId (relating the project with some user)
    const project = await Project.create({
      title,
      description,
      user: req.userId
    });


    /**
     * Asynchronous call to take each task
     * and put it inside the tasks block
     */
    await Promise.all(
      tasks.map(async task => {
        // On each loop we get the task object, relates it with
        // an project id (every task has to be inside of 
        // at least one project)
        const projectTask = new Task({ ...task, project: project._id });

        // Here we save it on database, but already related to one project
        await projectTask.save();

        // Here is where the magic comes true.
        // We push each projectTask (task)
        // inside the tasks block
        project.tasks.push(projectTask);
      })
    );

    // Saving the whole project
    // including each task
    await project.save();

    return res.send({ project });
  } catch (err) {
    res.status(400).send({ error: "Error creating new project" });
  }
});

/**
 * Router to update an project already created
 * Endpoint - /projects/list/project/:projectId
 */
router.put("/list/project/:projectId", async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    // Here is where we can modify our project
    // We pass an id (projectId) to know what project we're gonna update,
    // title and description will be updated here and tasks?
    // I almost forgot it, that {new: true} block is to 
    // return the most recently project after updated
    const project = await Project.findByIdAndUpdate(req.params.projectId, {
      title,
      description
    }, { new: true });

    // We need to remove all tasks and insert it again, so
    // Here we define tasks as an empty array
    project.tasks = [];
    // Here we remove from database, passing the project id
    await Task.remove({ project: project._id })

    // Adding all tasks again, and others if it has
    await Promise.all(
      tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id });

        await projectTask.save();

        project.tasks.push(projectTask);
      })
    );

    // Saving the whole project updated
    // including each task
    await project.save();

    return res.send({ project });
  } catch (err) {
    res.status(400).send({ error: "Error on update project" });
  }
});

/**
 * Router to delete an project
 * Endpoint - /projects/list/project/:projectId
 */
router.delete("/list/project/:projectId", async (req, res) => {
  try {
    // Finding the project based on  
    // project id that was passed 
    await Project.findByIdAndRemove(req.params.projectId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Error deleting project" });
  }
});

/**
 * Router to get projects based on user id
 * Endpoint - /projects/list/user/:userId
 */
router.get("/list/user/:userId", async (req, res) => {
  try {
    const projects = await Project.find();

    const projectsOfUser = [];
    projects.map(project => {
      if (project.user._id == req.params.userId) {
        projectsOfUser.push(project);
      }
    })

    return res.send({ projectsOfUser });
  } catch (err) {
    return res.status(400).send({ error: "Error on list projects of user" })
  }
});

module.exports = app => app.use("/projects", router);
