const express = require("express");
var jwt = require("express-jwt");
var auth = jwt({ secret: process.env.JWT_SECRET, userProperty: "payload" });

const AuthCtrl = require("../controllers/AuthController");

const router = express.Router();

router.post("/register", AuthCtrl.register)
router.post("/login", AuthCtrl.login)
router.post("/test", auth, function(req, res) {
  res.status(200).json({ message: "success" });
});

// router.get("/test", auth, function(req, res) {
//   res.status(200).json({ message: "success" });
// });

// router.get('/q', function (req, res) {
//   res.status(200).json({'message': 'success'});
// });

// router.post("/register", function(req, res) {
//   console.log(req.body);
//   if (!req.body.username || !req.body.password) {
//     console.log("All fields required");
//     res.status(504).json({ errorMessage: "All fields required" });
//   }
//   const user = new User();
//   user.username = req.body.username;
//   user.setPassword(req.body.password);
//   console.log(user);
//   user.save(function(err) {
//     if (err) {
//       console.log(`Failed to create user account because:${err.message}.`);
//       res.status(504).json({
//         messageError: `Failed to create user account because:${err.message}.`
//       });
//     } else {
//       res.status(200).json({ message: "success" });
//     }
//   });
// });

// router.post("/login", function(req, res, next) {
//   const { username, password } = req.body;
//   User.findOne({ username: username }, function(err, user) {
//     console.log(`Finding user = ${username}, err = ${err}, user = ${user}`);
//     if (err) {
//       console.log(`Error finding username, err = ${err}`);
//       return next(err);
//     }
//     if (!user) {
//       console.log(`No user found, user = ${user}`);
//       res.status(406).json({
//         message: "incorrect username"
//       });
//       return next(null, false, {
//         message: "Incorrect username."
//       });
//     }
//     if (user && !user.validPassword(password)) {
//       console.log(`Failed to validate password = ${password}`);
//       res.status(406).json({
//         message: "incorrect password"
//       });
//       return next(null, false, {
//         message: "Incorrect password."
//       });
//     }
//     token = user.generateJwt();
//     res.status(200).json({ token: token });
//   });
// });

module.exports = router;
