var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const ExerciseSchema = new Schema({
//     name: {type : String, required},
//     description: String,
//     set: {reuired : true, type : String},
//     reps: {reuired : true, type : String}
// });

//Workout Schema definition
const WorkoutSchema = new Schema({
    _userId : { required: true, type: Schema.Types.ObjectId},
    description : String,
    name: {type: String, required : true},
    exercises: []
});

mongoose.model('Workout', WorkoutSchema, 'Workouts');