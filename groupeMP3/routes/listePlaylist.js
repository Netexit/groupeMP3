var express = require('express');
var router = express.Router();
var plages = require('./plages');

/* GET users listing. */
// Récupère la liste des playlists pour les afficher sous forme d'un tableau
router.get('/', function(req, res, next) {
  plages.listePlaylist(function(items){
    res.render('listePlaylist', { title: 'Liste playlist', data : items });
  });
});

module.exports = router;
