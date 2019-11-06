const mongoose = require("mongoose");
var Workout = mongoose.model("Workout");

module.exports = {
  getAll: (req, res) => {
    console.log("Workout Controller: Getting all workouts");
    Workout.find({}, 
      // "id name description", 
      (err, workouts) => {
      if (err) return handleError(err);
      res.status(200).json(workouts);
    });
  },
  getAllByUser: (req, res) => {
    console.log("Workout Controller: Getting all workouts By User");
    Workout.find(
      { userId: user.id },
      "id name description",
      (err, workouts) => {
        if (err) return handleError(err);
        res.status(200).json(workouts);
      }
    );
  },
  create: (req, res) => {
    console.log(req.body);
    const newWorkout = {
      userId: req.body.userid,
      name: req.body.name,
      description: req.body.description
    };
    console.log(newWorkout);
    Workout.create(newWorkout, function(err, created) {
      if (err) return handleError(err);
      res.status(200).json({ message: "Workout Added Succefully " });
    });
  },
  getOneWithId: (req, res) => {
    Workout.findById(req.params.workout_id, (err, workout) => {
      if (err) return handleError(err);
      res.status(200).json(workout);
    });
  },
  updateOneWithId: (req, res) => {

  },
  deleteOneWithId: (req, res) => {
    
  }
  // create: (req, res) => {
  //     const workout_id = req.params.workout_id;
  //     if (workout_id) {
  //         WorkoutModel
  //             .findById(workout_id)
  //             .select('reviews')
  //             .exec((err, location) =>{
  //                 if (err) {
  //                     res.status(400).json(err);
  //                 } else {
  //                     _doAddReview(req, res, location); // Private helper method
  //                 }
  //             }
  //         );
  //     } else {
  //         res
  //             .status(404)
  //             .json({
  //                 "message":"Not found, locationidrequired"
  //         });
  //     }
  //     }
};

function handleError(err) {
  console.log("Error: ");
  console.log(err);
}
