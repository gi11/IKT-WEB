const express = require("express");
const router = express.Router();

const ScoreCtrl = require("../controllers/ScoreController");

router.route("/").get((req, res) => {
  ScoreCtrl.getTopScores(scores => {
    console.log("Scores fetched via regular api")
    res.status(200).json(scores);
  });
});

module.exports = router;
