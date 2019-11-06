var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = require("./ExerciseModel")

//Workout Schema definition
const WorkoutSchema = new Schema({
    // id: String,
    _userId : { required: true, type: Schema.Types.ObjectId},
    description : String,
    name: {type: String, required : true},
    exercises: [ExerciseSchema]
});

mongoose.model('Workout', WorkoutSchema, 'Workouts');