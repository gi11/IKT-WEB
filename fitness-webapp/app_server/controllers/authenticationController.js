var mongoose = require('mongoose');
var User = mongoose.model('User');

const passport = require('passport');
const auth = require('connect-ensure-login');

module.exports.ensureLoggedIn = () => {
    return auth.ensureLoggedIn('/login')
};

module.exports.register = function(req, res) {
    if(!req.body.username|| !req.body.password) {
        res.render('userForm', {"errorMessage":"All fields required"});
    }
    const user= new User();
    user.username= req.body.username;
    user.setPassword(req.body.password);
    user.save(function(err) {
        if(err) {
            req.flash('error',`Failed to create user account because:${error.message}.`);
            res.render('/');
        } 
        else{
            res.redirect('/');
        }
    });
};

module.exports.showRegister = function(req, res, next) {
    res.render('register', {
        title: "Register"
    })
};

module.exports.showLogin = function(req, res, next) {
    res.render('login', {
        title: "Login"
    })
};

module.exports.login = passport.authenticate('local', { 
    successReturnToOrRedirect: '/', 
    failureRedirect: '/login'
});

module.exports.logout = function(req, res){
    req.logOut();
    res.redirect('/');
};

