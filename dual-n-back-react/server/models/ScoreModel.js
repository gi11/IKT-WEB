var mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Score Schema definition
let ScoreScema = new Schema({
    score :     {type: Number, required: true },
    name :      {type: String, required: true },
    // _userId:    {type: Schema.Types.ObjectId, required: true} 
});

mongoose.model('Score', ScoreScema, 'Scores');
