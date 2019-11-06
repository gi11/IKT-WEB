var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Activity Schema definition
const ActivitySchema = new Schema({
    // _id: String,
    _userId : { required: true, type: Schema.Types.ObjectId},
    _workoutId : { required: true, type: Schema.Types.ObjectId},
    _exerciseId : { required: true, type: Schema.Types.ObjectId},
    // time: {type: String, required : true}
});

mongoose.model('Activity', ActivitySchema, 'Activities');