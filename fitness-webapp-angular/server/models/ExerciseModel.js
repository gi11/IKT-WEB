var mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Exercise Schema definition
module.exports.ExerciseSchema = new Schema({
    // id: String,
    name: {type : String, required : true},
    description: String,
    set: {required : true, type : Number},
    repeat_count: {required : true, type : Number},
    repeat_type: {required : true, type : String}
});

