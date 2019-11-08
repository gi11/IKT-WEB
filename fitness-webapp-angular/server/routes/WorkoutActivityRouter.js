const express = require("express");
const router = express.Router();

const WorkoutActivityCtrl = require("../controllers/WorkoutActivityController");

router.route("/")
  .get(WorkoutActivityCtrl.get) // Get List
  .post(WorkoutActivityCtrl.create); // Create
router.route("/:id")
  .delete(WorkoutActivityCtrl.deleteOneWithId); // Delete One

module.exports = router;
