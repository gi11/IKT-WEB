var express = require('express');
var router = express.Router();
const MainCtrl = require('../controllers/MainController');
const AuthCtrl = require('../controllers/AuthenticationController');

router.get('/', MainCtrl.home);
router.get('/about', MainCtrl.about);
router.get('/profile', AuthCtrl.ensureLoggedIn(), MainCtrl.profile);

router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);

router.get('/register', AuthCtrl.showRegister);
router.get('/login', AuthCtrl.showLogin);
router.get('/logout', AuthCtrl.logout);

module.exports = router;
