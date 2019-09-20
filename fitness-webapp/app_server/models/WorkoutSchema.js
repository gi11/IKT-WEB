var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Workout Schema definition
const WorkoutSchema = new Schema({
    fullName: {required: true, type: String, alias: 'name'},
    grade: {required: true, type: String}
});

mongoose.model('Workout', WorkoutSchema, 'Workouts');