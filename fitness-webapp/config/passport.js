// CONFIGURATION FROM SLIDES TAKES HASHING INTO ACCOUNT:
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(new Strategy({
    usernameField: 'username'
    },
    function(username, password, done) {
        User.findOne({ username: username}, function(err, user) {
            if(err) { return done(err); }
            if(!user) {return done(null, false, {
                message: 'Incorrect username.'
            });
        }
        if(user.passport != password) {
            return done(null, false, {
                message: 'Incorrect password.'
            });
        }
        return done(null, user);
    });  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



