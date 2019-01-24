var express = require('express');
var router = express.Router();
var plages = require('./plages');

/* GET users listing. */
// Récupère la liste des plages pour les afficher sous forme d'un tableau
router.get('/', function(req, res, next) {
  plages.listePlages(function(items){
    res.render('liste3', { title: 'Liste 3', data : items });
  });
});

module.exports = router;
