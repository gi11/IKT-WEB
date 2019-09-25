var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/HomeController');
const ctrlAuth = require('../controllers/authenticationController');
let auth = require('connect-ensure-login');

/* GET home page. */
router.get('/', ctrlHome.index);

router.get('/register', ctrlAuth.showRegister);
router.post('/register', ctrlAuth.register);

router.get('/login', ctrlAuth.showLogin);
router.post('/login', ctrlAuth.login);
router.get('/logout', function (req, res){
    req.logOut();
    res.redirect('/');
});

router.get('/profile', auth.ensureLoggedIn('/login'), function(req, res){
    //TODO: CHANGE RENDER:
    res.render('/profile', {users: [req.user]});
} )
module.exports = router;
