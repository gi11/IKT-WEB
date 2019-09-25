var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/HomeController');
const ctrlAuth = require('../controllers/authenticationController');



var passport = require('passport');

/* GET home page. */
router.get('/', ctrlHome.index);

router.get('/register', ctrlAuth.showRegister);
router.post('/register', ctrlAuth.register);


router.get('/login', ctrlAuth.showLogin);

router.post('/login', 
    passport.authenticate('local', 
    {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login'
    }), 
    // ctrlAuth.login
);
// router.post('/login', 
//     passport.authenticate('local', {failureRedirect: '/login'}),
//     function(req, res) {
//         res.redirect('/');
//     }
// );

router.get('/logout', function (req, res){
    req.logOut();
    res.redirect('/');
});

router.get('/profile', ctrlAuth.ensureLoggedIn(), 
    function(req, res){
        res.render('profile', {user: req.user});
    }
);

module.exports = router;
