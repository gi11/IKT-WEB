const express = require("express");
var jwt= require('express-jwt');
var auth= jwt({secret: process.env.JWT_SECRET, userProperty: 'payload'});
var mongoose = require('mongoose');

var User = mongoose.model('User');

const router = express.Router();

router.post('/test', auth, function (req, res) {
    res.status(200)
    .json({'message': 'success'});

});


router.post('/login', function (req, res, next)  {
    const {username, password } = req.body
    User.findOne({ 'username': username}, function(err, user) {
      console.log(`Finding user = ${username}, err = ${err}, user = ${user}`)
      if(err) { 
        console.log(`Error finding username, err = ${err}`)
        return next(err); 
      } 
      if(!user) {
        console.log(`No user found, user = ${user}`)
        return next(null, false, {
          message: 'Incorrect username.'
        });
      }
      if(!user.validPassword(password)) {
        console.log(`Failed to validate password = ${password}`)
        return next(null, false, {
            message: 'Incorrect password.'
        });
      }
      user.generateJwt();
      res.status(200);
    });  
  });

module.exports = router;
