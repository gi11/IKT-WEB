require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const compression = require("compression");

//Database
var mongoose = require("mongoose");
require('./db');

const authRouter = require("./routes/AuthRouter");
const userRouter = require("./routes/UserRouter");

const app = express();

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
buildpath = path.resolve(__dirname, "../client", "build");
console.log(buildpath)
app.use(express.static(buildpath));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);


indexpath = path.resolve(__dirname, "../client", "build", "index.html");
console.log(indexpath)
app.get("*", (req, res) => {
  res.sendFile(indexpath);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//Catch unauthorised errors
app.use(function(err, req, res, next) {
  if(err.name=== 'UnauthorizedError') {
    res.status(401);
    res.json({"message":err.name+ ": "+ err.message});
  }}
);

if (process.env.NODE_ENV === "production") {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Error occurred while handling the request.");
  });
} else {
  // Log stack trace of error message while in development
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
  });
}

module.exports = app;