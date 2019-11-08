const express = require("express");
const router = express.Router();

const WorkoutCtrl = require("../controllers/WorkoutController");
const ExerciseCtrl = require("../controllers/ExerciseController");

router.route("/")
  .get(WorkoutCtrl.getAll) // Get List
  .post(WorkoutCtrl.create); // Create
router.route("/:workout_id")
  .get(WorkoutCtrl.getOneWithId) // Get One
  .put(WorkoutCtrl.updateOneWithId) // Update One
  .delete(WorkoutCtrl.deleteOneWithId); // Delete One

router.route("/:workout_id/exercises")
  .post(ExerciseCtrl.create); // Create
router.route("/:workout_id/exercises/:exercise_id")
  .put(ExerciseCtrl.updateOneWithId) // Update One
  .delete(ExerciseCtrl.deleteOneWithId); // Delete One

module.exports = router;
