const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/AuthenticationController')
const WorkoutCtrl = require('../controllers/WorkoutController');

router.get('/', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.overview);
router.get('/:id', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.details);
router.post('/create', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.create );
router.post('/delete/:id', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.delete );
router.post('/edit/:id', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.edit );

router.post('/:workout_id/exercises/create', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.createExercise);
router.post('/:workout_id/exercises/delete/:id', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.deleteExercise);
router.post('/:workout_id/exercises/edit/:id', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.editExercise);

module.exports = router;