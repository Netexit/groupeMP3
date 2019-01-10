// Imports
var mongo = require('mongodb');
var mm = require('music-metadata');
var fs = require('fs');

var Server = mongo.Server,
    Db = mongo.Db,
    MongoClient = mongo.MongoClient,
    database;

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, auto_reconnect: true }, function(err,db){
  if(err){
    console.error(err.message);
  }
  else{
    database=db.db("mp3");
  }
});

exports.findAll = function(req, res) {
  database.collection('plage', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving plage: ' + id);
  database.collection('plage', function(err, collection) {
    // necessaire d'utiliser l'objectID pour requêter la base avec l'id
    var query = {"_id":new mongo.ObjectID(id)};
    collection.find(query).toArray(function(err, item) {
      console.log(item);
      res.send(item);
    });
  });
};

//Structure d'ajout :
//  traitement de l'ajout
//  nomPlage
//  nomArtiste
//  nomAlbum
//  featArtiste
//  duree
//  nbEcoutes
//  dateAjout
//  dataJSON
//  2chemins

exports.addPlage = function(req, res) {
  // console.log('Adding plage: ' + JSON.stringify(plage));
  var path=req.body.name;
  var name=path.substring(5);

  if(fs.existsSync(appRoot+"/files"+path+".mp3")){
    mm.parseFile(appRoot+"/files"+path+".mp3", {native: true})
    .then( metadata => {
      var content = fs.readFileSync(appRoot+"/files/tmp/vald.json"); // à modifier pour que le chemin soit dynamique. récupère le contenu du fichier JSON
      // création de l'objet à insérer dans la base
      var plage={
        "nomPlage" : req.body.nomPlage,
        "nomArtiste" : req.body.nomArtiste,
        "nomAlbum" : req.body.nomAlbum,
        "featArtiste" : req.body.featArtiste,
        "duree" : metadata.format.duration,
        "nbEcoutes" : 0,
        "dateAjout" : new Date(),
        "dataJSON" : JSON.parse(""+content).data,
        "cheminMP3" : appRoot+"/files/mp3/"+name+".mp3",
        "cheminPochette" : appRoot+"/files/art/"+name+".jpg"
      };
      database.collection('plage', function(err, collection) {
        collection.insertOne(plage, {safe:true}, function(err, result) {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send("Success!");
          }
        });
      });

    })
    .catch( err => {
      console.error(err.message);
    });
  }
  else{
    res.send("Valeur incorrecte dans le formulaire");
  }

}

exports.deletePlage = function(req, res) {
  var id = req.params.id;
  console.log('Deleting plage: ' + id);
  database.collection('plage', function(err, collection) {
    var query = {"_id":new mongo.ObjectID(id)};
    collection.deleteOne(query, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
}

exports.updatePlage = function(req, res){
  var id = req.params.id;
  var plage = req.body;
  console.log('Updating plage: ' + id);
  database.collection('plage', function(err, collection) {
    var query = {"_id":new mongo.ObjectID(id)};
    collection.updateOne(query, {$set : plage,$currentDate:{lastModified:true}}, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error updating plage: ' + err);
        res.send({'error':'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(plage);
      }
    });
  });
}
