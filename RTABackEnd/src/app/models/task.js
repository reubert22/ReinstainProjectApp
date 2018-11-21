const mongoose = require("../../database");

// Const used to make our Task Schema
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    require: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  completed: {
    type: Boolean,
    require: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Const used to define our Schema
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
