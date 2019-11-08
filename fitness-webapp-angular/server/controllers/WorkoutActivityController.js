const mongoose = require("mongoose");
var WorkoutActivity = mongoose.model("WorkoutActivity");

module.exports = {
  get: (req, res) => {
    if (!req.query.userid && !req.query.workoutid) {
      return getAll(req, res);
    } else if (req.query.userid && !req.query.workoutid) {
      return getAllByUser(req, res);
    } else if (!req.query.userid && req.query.workoutid) {
      return getAllByWorkout(req, res);
    } else {
      return getAllByUserAndWorkout(req, res);
    }
  },
  getAll: (req, res) => {
    console.log("WorkoutActivity Controller: Getting all WorkoutActivities");
    WorkoutActivity.find(
      {},
      "_id _userId _workoutId _exerciseId",
      (err, workoutActivities) => {
        if (err) return handleError(err);
        res.status(200).json(workoutActivities);
      }
    );
  },
  getAllByUser: (req, res) => {
    const userId = req.query.userid;
    console.log(
      "WorkoutActivity Controller: Getting all WorkoutActivities By User with userid = " +
        userId
    );
    WorkoutActivity.find(
      { _userId: userid },
      "_id _userId _workoutId _exerciseId",
      (err, workoutActivities) => {
        if (err) return handleError(err);
        res.status(200).json(workoutActivities);
      }
    );
  },
  getAllByWorkout: (req, res) => {
    const workoutId = req.query.workoutid;
    console.log(
      "WorkoutActivity Controller: Getting all WorkoutActivities By workout with workoutid = " +
        workoutId
    );
    WorkoutActivity.find(
      { _workoutId: workoutId },
      "_id _userId _workoutId _exerciseId",
      (err, workoutActivities) => {
        if (err) return handleError(err);
        res.status(200).json(workoutActivities);
      }
    );
  },
  getAllByUserAndWorkout: (req, res) => {
    const workoutId = req.query.workoutid;
    const userId = req.query.userid;
    console.log(
      "WorkoutActivity Controller: Getting all WorkoutActivities by workout with workoutid = " +
        workoutId +
        "and user with userid = " +
        userId
    );
    WorkoutActivity.find(
      { _workoutId: workoutId, _userId: userId },
      "_id _userId _workoutId _exerciseId",
      (err, workoutActivities) => {
        if (err) return handleError(err);
        res.status(200).json(workoutActivities);
      }
    );
  },
  create: (req, res) => {
    console.log(
      "WorkoutActivity Controller: Creating new WorkoutActivity from request with body:"
    );
    console.log(req.body);
    const newWorkoutActivity = {
      _userId: req.body._userId,
      _workoutId: req.body._workoutId,
      _exerciseId: req.body._exerciseId
    };
    console.log("WorkoutActivity Controller: Creating new WorkoutActivity with properties:");
    console.log(newWorkoutActivity);
    WorkoutActivity.create(newWorkoutActivity, function(err, created) {
      if (err) return handleError(err);
      res.status(200).json({ message: "WorkoutActivity Added Succefully " });
    });
  },
  deleteOneWithId: (req, res) => {
    const id = req.params.id;
    console.log("WorkoutActivity Controller: Deleting WorkoutActivity with id = " + id);
    WorkoutActivity.findByIdAndDelete(id, function(err, deleted) {
      if (err) return handleError(err);
      res.status(200).json({ message: "WorkoutActivity Deleted Succefully " });
    });
  }
};

function handleError(err) {
  console.log("Error: ");
  console.log(err);
}
