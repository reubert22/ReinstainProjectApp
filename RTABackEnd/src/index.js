const express = require("express");
const bodyParser = require("body-parser");

const app = express();

/**
 * To understand request to our API in json format
 * bodyParser.json
 */
app.use(bodyParser.json());

/**
 * To understand params by url
 * bodyParser.urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * We're gonna use this app in all of our application
 */
require("./controllers/authControllers")(app);
require("./controllers/projectControllers")(app);

/**
 * Default port
 */
app.listen(3000);
