﻿require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const compression = require("compression");

//Database
var mongoose = require("mongoose");
require('./db');

const authRouter = require("./routes/AuthRouter");
const workoutsRouter = require("./routes/WorkoutRouter");
const workoutActivitiesRouter = require("./routes/WorkoutActivityRouter");
const usersRouter = require("./routes/UserRouter");

const app = express();

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "build")));

app.use("/api", authRouter);
app.use("/api/workouts", workoutsRouter);
app.use("/api/workoutactivities", workoutActivitiesRouter);
// app.use("/api/users", usersRouter);


app.get("*", (req, res) => {
  // res.sendFile("build/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// TODO Web Template Studio: Add your own error handler here.

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