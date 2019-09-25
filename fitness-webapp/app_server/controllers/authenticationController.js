var passport = require('passport');
var mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = function(req, res) {
    if(!req.body.name|| !req.body.password) {
        res.render('userForm', {"errorMessage":"All fields required"});
    }
    const user= new User();
    user.name = req.body.name;
    user.email= req.body.email;
    //TODO change to use setPassword:
    user.password = req.body.password;
    user.save(function(err) {
        if(err) {
            req.flash('error',`Failed to create user account because:${error.message}.`);
            res.render('/users/new');
        }
        else {
            res.redirect('/');
        }
    });    
};

module.exports.showRegister = function(req, res, next) {
    res.render('userForm', {title : 'Register Now', path: '/register'})
}

module.exports.showLogin = function(req, res, next) {
    res.render('userForm', {title : 'Login', path: '/login'})
}

module.exports.login = function(req, res) {
    passport.authenticate('local', {failureRedirect: '/login'}),
    function(req, res) {
        res.redirect('/');
    };
};

module.exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
};

