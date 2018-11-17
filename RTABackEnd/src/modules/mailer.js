const nodemailer = require("nodemailer");
const path = require("path");

// Const used to fill variables in HMTL file
const hbs = require("nodemailer-express-handlebars");

// Const used to get some mail engine configs
const { host, port, user, pass } = require("../config/mail.json");

// Const used to create the mail engine
var transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});

/**
 * Function to direct our transport
 * for resourcers folder
 */
transport.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./resourcers/mail"),
    extName: ".html"
  })
);

module.exports = transport;
