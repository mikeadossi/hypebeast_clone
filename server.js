/* global process, console, module */

require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes.js");
const flash = require("connect-flash");
const passport = require("./passport");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(flash());

app.set("views", [__dirname + "/src/views/hypebeast", __dirname + "/src/views/hbx"]);
app.set("view engine", "pug");

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require("express-session")({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "src/public")));
app.use("/", routes);

app.use(function(req, res) {
  const err = new Error("Not Found");
  err.status = 404;
});


app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;
