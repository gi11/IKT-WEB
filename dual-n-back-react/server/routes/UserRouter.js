const express = require("express");
const router = express.Router();

const UserCtrl = require("../controllers/UserController");

router.route("/")
  .get(UserCtrl.getAll) // Get List
router.route("/:id")
  .get(UserCtrl.getOneWithId) // Get One


module.exports = router;