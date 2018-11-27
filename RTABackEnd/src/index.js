const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const allowCors = require('../src/config/cors')

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

app.use(allowCors);

/**
 * We're gonna use this app in all of our application
 */
require("./app/controllers/index")(app);

/**
 * Default port
 */
app.listen(3000);
