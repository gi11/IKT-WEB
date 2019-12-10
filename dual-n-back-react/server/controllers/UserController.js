const mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = {
  getAll: (req, res) => {
    console.log("User Controller: Getting all users");
    User.find({}, "_id username hash", (err, users) => {
        if (err) return handleError(err);
        res.status(200).json(users);
    });
  },
  getOneWithId: (req, res) => {
    const id = req.params.id;
    console.log("User Controller: Getting user with id = " + id);
    User.findById(id, (err, user) => {
      if (err) return handleError(err);
      res.status(200).json(user);
    });
  }
};

function handleError(err) {
  console.log("Error: ");
  console.log(err);
}
