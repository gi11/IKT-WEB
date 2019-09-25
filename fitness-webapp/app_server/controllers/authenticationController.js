var mongoose = require('mongoose');
var User = mongoose.model('User');

const auth = require('connect-ensure-login');

// module.exports.ensureLoggedIn = function(cb) {
//     return [
//         auth.ensureLoggedIn('/login'), 
//         cb
//     ]
// }
module.exports.ensureLoggedIn = () => {return auth.ensureLoggedIn('/login')};

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
    res.render('userForm', {title : 'Register Now', path: '/register'})
}

module.exports.showLogin = function(req, res, next) {
    res.render('userForm', {title : 'Login', path: '/login'})
}

module.exports.login = function(req, res) {
    console.log(`req session returnto = ${req.session.returnTo}`)
    res.redirect(req.session.returnTo || '/');
};

module.exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
};

