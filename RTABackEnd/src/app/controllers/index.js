// Base of controllers

// Const used to work with filesystem of node
const fs = require("fs");

// Const used to work with folder paths
const path = require("path");

/**
 * Searching for all files in that folder
 * It can't be the index.js neither files
 * that begin with "."
 */
module.exports = app => {
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(file => require(path.resolve(__dirname, file))(app));
};
