'use strict'

const mongoose = require('mongoose');
var WorkoutModel = mongoose.model('Workout');

// Get all workout programs of user with id
module.exports = {
    overview: (req, res) => {
        const user = req.user;
        WorkoutModel.find({ '_userId': user._id }, '_id name description', function (err, workouts) {
            if (err) return handleError(err);
            res.render('workouts', { 
                title: "Workouts Overview",
                user: user, 
                workouts: workouts 
            });
        })
    },
    details: (req, res) => {
        const user = req.user;
        WorkoutModel.findById(req.params.id,
            function (err, workout) {
                if (err) return handleError(err);
                res.render('workoutdetails', { 
                    title: "Workout Details",
                    user: user, 
                    workout: workout 
                });
            }
        );
    },
    create: (req, res) => {
        const newWorkout = {
            _userId: req.user._id,
            name: req.body.name,
            description: req.body.description
        };
        WorkoutModel.create(
            newWorkout,
            function (err, created) {
                if (err) return handleError(err);
                res.redirect('/workouts')
            });
    },
    delete: (req, res) => {
        console.log(req.params)
        WorkoutModel.findByIdAndDelete(
            req.params.id,
            function (err, deleted) {
                if (err) return handleError(err);
                res.redirect('/workouts')
            });
    },
    edit: (req, res) => {
        const updatedWorkout = {
            name: req.body.name,
            description: req.body.description
        };
        WorkoutModel.findByIdAndUpdate(
            req.params.id,
            updatedWorkout,
            function (err, updated) {
                if (err) return handleError(err);
                res.redirect('/workouts/' + req.params.id);
            }
        );
    },
    createExercise: (req, res) => {
        const newExercise = {
            name: req.body.name,
            description: req.body.description,
            set: req.body.set,
            repeat_count: req.body.repeat_count,
            repeat_type: req.body.repeat_type
        };
        WorkoutModel.findByIdAndUpdate(
            req.params.workout_id,
            { $push: { exercises: newExercise } },
            function (err, updated) {
                if (err) return handleError(err);
                res.redirect(`/workouts/${req.params.workout_id}`)
            }
        );
    },
    deleteExercise: (req, res) => {
        console.log("deleteExercise")
        console.log(req.params)
        console.log(req.body)
        WorkoutModel.findByIdAndUpdate(
            req.params.workout_id,
            { $pull: { exercises: {_id: req.params.id} } },
            function (err, deleted) {
                if (err) return handleError(err);
                res.redirect(`/workouts/${req.params.workout_id}`)
            }
        );
    },
    editExercise: (req, res) => {
        const updatedExercise = {
            // _id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            set: req.body.set,
            repeat_count: req.body.repeat_count,
            repeat_type: req.body.repeat_type
        };
        const selector = "exercises."+req.params.id
        WorkoutModel.updateOne(
            {
                "_id": req.params.workout_id,
                "exercises._id": req.params.id
            },
            { $set: { 
                "exercises.$.name" : req.body.name,
                "exercises.$.description": req.body.description,
                "exercises.$.set": req.body.set,
                "exercises.$.repeat_count": req.body.repeat_count,
                "exercises.$.repeat_type": req.body.repeat_type
                } 
            },
            function (err, updated) {
                if (err) return handleError(err);
                res.redirect(`/workouts/${req.params.workout_id}`)
            }
        );
    }
}

function handleError(err){
    console.log("Error: ")
    console.log(err)
}