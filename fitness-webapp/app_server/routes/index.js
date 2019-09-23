var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/HomeController')

/* GET home page. */
router.get('/', ctrlHome.index);

module.exports = router;
