var express = require('express');
var router = express.Router();
var mm = require('music-metadata');
var util = require('util');
var shelljs = require('shelljs');
var tmp = require('tmp');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload');
});

// Traitement des informations de la musique avant le passage vers le formulaire
router.post('/formulaireAjout', function(req, res, next){
  //console.log(req.files.mp3.data.toString("ascii"));
  let mp3 = req.files.mp3;
  if(mp3!=null){
    //console.log(mp3.name.replace(/\s/g, ''));
    let name = tmp.tmpNameSync();
    //enregistrement du fichier dans le dossier temporaire
    mp3.mv(appRoot+"/files"+name+".mp3", function(err){
      if(err){
        return res.status(500).send(err);
      }
      //lecture des metadonnées
      mm.parseFile(appRoot+"/files"+name+".mp3", {native: true})
      .then( metadata => {
        console.log(util.inspect(metadata, {showHidden: false, depth: null}));
        //shelljs.exec("bash "+appRoot+"/files/scripts/art.sh "+name);
        shelljs.exec("bash "+appRoot+"/files/scripts/test.sh "+name);
        res.render('formulaireAjout',{artist:metadata.common.artist,title:metadata.common.title,name:name});
      })
      .catch( err => {
        console.error(err.message);
      });
    });
  }
});

module.exports = router;
