var express = require('express');
var router = express.Router();

const AuthCtrl = require('../controllers/authenticationController')
const WorkoutCtrl = require('../controllers/WorkoutController');

router.get('/', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.getWorkoutsOfUser);

router.post('/create', AuthCtrl.ensureLoggedIn(), 
    WorkoutCtrl.create
);
router.post('/delete/:id', AuthCtrl.ensureLoggedIn(), 
    WorkoutCtrl.delete
);
router.post('/edit/:id', AuthCtrl.ensureLoggedIn(), 
    WorkoutCtrl.edit
);

router.get('/:id', AuthCtrl.ensureLoggedIn(), 
    WorkoutCtrl.details
);

router.post('/:wpid/exercises/create', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.create);
router.post('/:wpid/exercises/delete/:id', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.delete);
router.post('/:wpid/exercises/edit/:id', AuthCtrl.ensureLoggedIn(), WorkoutCtrl.edit);

module.exports = router;