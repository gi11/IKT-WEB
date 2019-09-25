// CONFIGURATION FROM SLIDES TAKES HASHING INTO ACCOUNT:
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(new Strategy(
  function(username, password, done) {
    console.log(`Passport Strategy username_ = ${username}, password = ${password}, done = ${done}`)
    User.findOne({ 'username': username}, function(err, user) {
      console.log(`Finding user = ${username}, err = ${err}, user = ${user}`)
      if(err) { 
        console.log(`Error finding username, err = ${err}`)
        return done(err); 
      }
      if(!user) {
        console.log(`No user found, user = ${user}`)
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if(!user.validPassword(password)) {
        console.log(`Failed to validate password = ${password}`)
        return done(null, false, {
            message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });  
  })
);

passport.serializeUser(function(user, cb) {
  console.log(`serializeUser, user ${user} cb= ${cb}`);
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  console.log(`deserializeUser, id ${id} cb= ${cb}`);
  User.findById(id, function(err,user){
    if(err){
      return cb(err);
    }
    cb(null, user);
  });
  // User.findOne({ '_id' : id}, function (err, user) {
  //   if (err) { 
  //     return cb(err); 
  //   }
  //   cb(null, user);
  // });
});



