'use strict'

const mongoose = require('mongoose');
var WorkoutModel = mongoose.model('Workout');

// Get all workout programs of user with id
module.exports = {
    getWorkoutsOfUser: (req, res) => {
        const user = req.user;
        WorkoutModel.find({ '_userId': user._id}, '_id name description', function(err, workouts) {
            if(err) return handleError(err);
            res.render('workouts', {user: user, workouts: workouts });
        })
    },
    details: (req, res) => {
        const user = req.user;
        WorkoutModel.findById(req.params.id,
            function(err, workout) {
                if(err) return handleError(err);
                res.render('workoutdetails', {user: user, workout: workout });
            }
        );
    },
    create: (req, res) => {
        WorkoutModel.create({
            _userId: req.user._id,
            name: req.body.name,
            description: req.body.description
        }, 
        function(err, created) {
            if(err) return handleError(err);
            res.redirect('/workouts')
        });
    },
    delete: (req, res) => {
        WorkoutModel.findByIdAndDelete(req.params.id, 
        function(err, deleted) {
            if(err) return handleError(err);
            res.redirect('/workouts')
        });
    },
    edit: (req, res) => {
        WorkoutModel.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description
        },
        function(err, updated) {
            if(err) return handleError(err);
            res.redirect('/workouts');
        });
    }
}