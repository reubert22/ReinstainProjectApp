const mongoose = require("../../database");

// Const used to make our Project Schema
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Const used to define our Schema
const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
