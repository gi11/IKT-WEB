var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('workouts', { data: "somedata" });
});

module.exports = router;