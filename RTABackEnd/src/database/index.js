// Const used to connect on database
const mongoose = require("mongoose");

/**
 * Function to make connection with database
 */
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/noderest",
  { useNewUrlParser: true }
);

module.exports = mongoose;
