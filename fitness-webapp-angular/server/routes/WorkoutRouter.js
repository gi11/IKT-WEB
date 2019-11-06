const express = require("express");
const router = express.Router();

const WorkoutCtrl = require('../controllers/WorkoutController');

router.route('/')
    .get(WorkoutCtrl.getAll) // Get List
    .post(WorkoutCtrl.create); // Create
router.route('/:workout_id')
    .get(WorkoutCtrl.getOneWithId) // Get One
    .put(WorkoutCtrl.updateOneWithId) // Update One
    .delete(WorkoutCtrl.deleteOneWithId); // Delete One

// const ExerciseCtrl = require('../controllers/ExerciseController');
// router.get('/:workout_id/exercises', ExerciseCtrl.getAll); // Get All
// router.post('/:workout_id/exercises', ExerciseCtrl.create); // Create
// router.get('/:workout_id/exercises/:exercise_id', ExerciseCtrl.getOneWithId); // Get One
// router.put('/:workout_id/exercises/:exercise_id', ExerciseCtrl.updateOneWithId); // Update One
// router.delete('/:workout_id/exercises/:exercise_id', ExerciseCtrl.deleteOneWithId); // Delete One

module.exports = router;