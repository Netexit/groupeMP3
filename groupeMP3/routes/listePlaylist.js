var express = require('express');
var router = express.Router();
var plages = require('./plages');

/* GET users listing. */
router.get('/', function(req, res, next) {
  plages.listePlaylist(function(items){
    res.render('listePlaylist', { title: 'Liste playlist', data : items });
  });
});

module.exports = router;
