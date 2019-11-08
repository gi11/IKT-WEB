const mongoose = require("mongoose");
var Workout = mongoose.model("Workout");

module.exports = {
  getAll: (req, res) => {
    if (!req.query.userid) {
      console.log("Workout Controller: Getting all workouts");
      Workout.find({}, "_id _userId name description", (err, workouts) => {
        if (err) return handleError(err);
        res.status(200).json(workouts);
      });
    } else {
      return getAllByUser(req, res);
    }
  },
  getAllByUser: (req, res) => {
    const userId = req.query.userid;
    console.log(
      "Workout Controller: Getting all workouts By User with userid = " + userId
    );
    Workout.find(
      { _userId: userid },
      "_id _userId name description",
      (err, workouts) => {
        if (err) return handleError(err);
        res.status(200).json(workouts);
      }
    );
  },
  create: (req, res) => {
    console.log(
      "Workout Controller: Creating new workout from request with body:"
    );
    console.log(req.body);
    const newWorkout = {
      _userId: req.body._userId,
      name: req.body.name,
      description: req.body.description
    };
    console.log("Workout Controller: Creating new workout with properties:");
    console.log(newWorkout);
    Workout.create(newWorkout, function(err, created) {
      if (err) return handleError(err);
      res.status(200).json({ message: "Workout Added Succefully " });
    });
  },
  getOneWithId: (req, res) => {
    const workoutId = req.params.workout_id;
    console.log("Workout Controller: Getting workout with id = " + workoutId);
    Workout.findById(workoutId, (err, workout) => {
      if (err) return handleError(err);
      res.status(200).json(workout);
    });
  },
  updateOneWithId: (req, res) => {
    console.log("HALLO")
    const workoutId = req.params.workout_id;
    console.log("Workout Controller: Updating workout with id = " + workoutId);
    const updatedWorkout = {
      name: req.body.name,
      description: req.body.description
    };
    console.log("Workout Controller: New workout properties:");
    console.log(updatedWorkout);
    Workout.findByIdAndUpdate(
      workoutId,
      updatedWorkout,
      (err, updated) => {
        if (err) return handleError(err);
        res.status(200).json({ message: "Workout Updated Succefully " });
      }
    );
  },
  deleteOneWithId: (req, res) => {
    const workoutId = req.params.workout_id;
    console.log("Workout Controller: Deleting workout with id = " + workoutId);
    Workout.findByIdAndDelete(workoutId, function(err, deleted) {
      if (err) return handleError(err);
      res.status(200).json({ message: "Workout Deleted Succefully " });
    });
  }
};

function handleError(err) {
  console.log("Error: ");
  console.log(err);
}