const mongoose = require("mongoose");
var Workout = mongoose.model("Workout");

module.exports = {
  create: (req, res) => {
    console.log("Exercise Controller: Creating new exercise from request with body:");
    console.log(req.body);
    const newExercise = {
      name: req.body.name,
      description: req.body.description,
      set: req.body.set,
      repeat_count: req.body.repeat_count,
      repeat_type: req.body.repeat_type
    };
    console.log("Exercise Controller: Creating new exercise:");
    console.log(newExercise);
    Workout.findByIdAndUpdate(
      req.params.workout_id,
      { $push: { exercises: newExercise } },
      function(err, updated) {
        if (err) return handleError(err);
        res.status(200).json({ message: "Exercise Added Succefully " });
      }
    );
  },
  updateOneWithId: (req, res) => {
    const workoutId = req.params.workout_id;
    const exerciseId = req.params.exercise_id;
    console.log("Exercise Controller: Updating exercise with id = " + exerciseId);
    console.log("Exercise Controller: From workout with id = " + workoutId);
    const updatedExercise = {
      name: req.body.name,
      description: req.body.description,
      set: req.body.set,
      repeat_count: req.body.repeat_count,
      repeat_type: req.body.repeat_type
    };
    console.log("Exercise Controller: Updated exercise has the following parameters:");
    console.log(updatedExercise)
    const selector = "exercises." + exerciseId;
    Workout.updateOne(
      {
        _id: workoutId,
        "exercises._id": exerciseId
      },
      {
        $set: {
          "exercises.$.name": req.body.name,
          "exercises.$.description": req.body.description,
          "exercises.$.set": req.body.set,
          "exercises.$.repeat_count": req.body.repeat_count,
          "exercises.$.repeat_type": req.body.repeat_type
        }
      },
      function(err, updated) {
        if (err) return handleError(err);
        res.status(200).json({ message: "Exercise Updated Succefully " });
      }
    );
  },
  deleteOneWithId: (req, res) => {
    const workoutId = req.params.workout_id;
    const exerciseId = req.params.exercise_id;
    console.log("Exercise Controller: Deleting exercise with id = " + exerciseId);
    console.log("Exercise Controller: From workout with id = " + workoutId);
    Workout.findByIdAndUpdate(
      workoutId,
      { $pull: { exercises: { _id: exerciseId } } },
      function(err, deleted) {
        if (err) return handleError(err);
        res.status(200).json({ message: "Exercise Deleted Succefully " });
      }
    );
  }
};

function handleError(err) {
  console.log("Error: ");
  console.log(err);
}
