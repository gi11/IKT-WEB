
require("./models/UserModel");
require("./models/ScoreModel")
var mongoose = require("mongoose");

var dbURI = process.env.MONGODB_URI || "mongodb://localhost/front-n-back-DB";

mongoose.connect(dbURI);

const errFunction = function(err) {
  if (err) return handleError(err);
};

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", err => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemonrestart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

// For app termination
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on("SIGTERM", () => {
  gracefulShutdown("Herokuapp shutdown", () => {
    process.exit(0);
  });
});
