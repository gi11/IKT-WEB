const mongoose = require("mongoose");
var Score = mongoose.model("Score");
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  create: (score) => {
    console.log(
      "Score Controller: Creating new score from passed data:"
    );
    console.log(JSON.stringify(score));
    const newScore = {
    //   _userId: score._userId,
      name: score.name,
      score: score.score
    };
    console.log("Score Controller: Creating new score with properties:");
    console.log(newScore);
    Score.create(newScore, function(err, created) {
      if (err) return handleError(err);
    });
  },

  getTopScores: (callback) => {
      console.log("Score controller retrieving highest scores");
      Score.find({})
      .sort({score: -1})
      .limit(8).exec(function(err, scores){
          handleError(err);
          callback(scores);
      });
  }
};

function handleError(err) {
  console.log("Error: ");
  console.log(err);
}
