var express = require('express');
var router = express.Router();
var plages = require('./plages')

/* GET users listing. */

// Charge le lecteur selon la nature de l'écoute (musique seule, ou liste de lecture)
router.get('/', function(req, res, next) {
  var id = req.query.idPlaylist;
  // Si c'est une liste de lecture
  if(id){
    plages.lecteurPlaylist(id, function(item){
      res.render('lecteur', { title: 'Lecteur', data: item})
    });
  }
  // Sinon
  else{
    plages.lecteurMusique(req.query.id, function(item){
      res.render('lecteur', { title: 'Lecteur', data: item });
    });
  }
});

module.exports = router;
