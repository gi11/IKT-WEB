var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    name: {type : String, required : true},
    description: String,
    set: {reuired : true, type : Number},
    repeat_count: {reuired : true, type : Number},
    repeat_type: {reuired : true, type : String}
});

//Workout Schema definition
const WorkoutSchema = new Schema({
    _userId : { required: true, type: Schema.Types.ObjectId},
    description : String,
    name: {type: String, required : true},
    exercises: [ExerciseSchema]
});


mongoose.model('Workout', WorkoutSchema, 'Workouts');