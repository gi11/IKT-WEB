var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// let ExerciseSchema = require("./ExerciseModel")

//Exercise Schema definition
let ExerciseSchema = new Schema({
    name: {type : String, required : true},
    description: String,
    set: {required : true, type : Number},
    repeat_count: {required : true, type : Number},
    repeat_type: {required : true, type : String}
});

//Workout Schema definition
const WorkoutSchema = new Schema({
    _userId : { required: true, type: Schema.Types.ObjectId},
    description : String,
    name: {type: String, required : true},
    exercises: [ExerciseSchema]
});

mongoose.model('Workout', WorkoutSchema, 'Workouts');