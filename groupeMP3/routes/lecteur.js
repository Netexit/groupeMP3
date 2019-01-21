var express = require('express');
var router = express.Router();
var plages = require('./plages')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var id = req.query.id;
  plages.lecteur(id, function(item){
    res.render('lecteur', { title: 'Lecteur', data : item });
  });
});

module.exports = router;
