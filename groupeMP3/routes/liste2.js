var express = require('express');
var router = express.Router();
var plages = require('./plages');

/* GET users listing. */
router.get('/', function(req, res, next) {
  plages.listePlages(function(items){
    res.render('liste2', { title: 'Liste 2', data : items });
  });
});

module.exports = router;
