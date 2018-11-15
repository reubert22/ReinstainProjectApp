/**
 * To connect on database
 */
const mongoose = require("mongoose");

/**
 * Making connection with database
 */
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/noderest",
  { useNewUrlParser: true }
);

module.exports = mongoose;
