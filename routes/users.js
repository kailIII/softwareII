var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    Usuario.findAll();
    res.render('login');
});

module.exports = router;
