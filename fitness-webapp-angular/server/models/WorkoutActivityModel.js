var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Workout Activity Schema definition
const WorkoutActivitySchema = new Schema({
    _userId : { required: true, type: Schema.Types.ObjectId},
    _workoutId : { required: true, type: Schema.Types.ObjectId},
    _exerciseId : { required: true, type: Schema.Types.ObjectId}
});

mongoose.model('WorkoutActivity', WorkoutActivitySchema, 'WorkoutActivities');