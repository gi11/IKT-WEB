var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/HomeController');
const ctrlAuth = require('../controllers/authenticationController');

/* GET home page. */
router.get('/', ctrlHome.index);

router.get('/register', ctrlAuth.showRegister);
router.post('/register', ctrlAuth.register);
router.get('/login', ctrlAuth.showLogin);
router.post('/login', ctrlAuth.login);
module.exports = router;
