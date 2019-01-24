// Ce fichier se connecte à la base de données et permet la manipulation CRUD pour les plages.
// Il permet aussi la manipulation de la base afin de répondre aux besoins des pages d'affichage

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
    // Nom de la base, équivalent à 'use mp3;'
    database=db.db("mp3");
  }
});

// Récupère toutes les plages. Equivalent à 'db.plage.find()'
exports.findAll = function(req, res) {
  database.collection('plage', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

// Récupère une plage, selon un id passé en paramètre
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

// Ajoute une plage dans la base de données.
// Cette fonction récupère les informations passées par le formulaire de la page formulaireAjout.
// Elle construit un objet plage avec toutes les informations nécessaires et lit les metadonnées du fichier mp3 ajouté par l'utilisateur afin de renseigner la durée dans la base.
exports.addPlage = function(req, res) {
  // console.log('Adding plage: ' + JSON.stringify(plage));
  var path=req.body.name;
  var name=path.substring(5);
  var pochette=req.files.pochette;
  if(fs.existsSync(appRoot+"/files"+path+".mp3")){
    // Lecture des métadonnées
    mm.parseFile(appRoot+"/files"+path+".mp3", {native: true})
    .then( metadata => {
      var content = fs.readFileSync(appRoot+"/files"+path+".json"); // à modifier pour que le chemin soit dynamique. récupère le contenu du fichier JSON
      // Création du nom final du fichier en concaténant le nom de la plage, de l'artiste et de la durée, en retirant tous les espaces possibles
      var nomFichierFinal = req.body.nomPlage+req.body.nomArtiste+metadata.format.duration;
      nomFichierFinal = nomFichierFinal.replace(/\s/g, ''); // retire tous les espaces de la chaine.
      // création de l'objet à insérer dans la base
      var plage={
        "nomPlage" : req.body.nomPlage,
        "nomArtiste" : req.body.nomArtiste,
        "nomAlbum" : req.body.nomAlbum,
        "featArtiste" : req.body.featArtiste,
        "duree" : metadata.format.duration,
        "nbEcoutes" : 0,
        "nbLikes" : 0,
        "dateAjout" : new Date(),
        "dataJSON" : JSON.parse(""+content).data,
        "cheminMP3" : "mp3/"+nomFichierFinal+".mp3",
        "cheminPochette" : "art/"+nomFichierFinal+".jpg"
      };
      // Ajout dans la bdd
      database.collection('plage', function(err, collection) {
        collection.insertOne(plage, {safe:true}, function(err, result) {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send("Success!");
          }
        });
        // A l'issue de l'ajout, renomme les fichiers vers leur dossier respectif, et supprime le fichier json dont le contenu est stocké dans la bdd
        fs.rename(appRoot+"/files"+path+".mp3",appRoot+"/files/mp3/"+nomFichierFinal+".mp3",function(err){
          if(err)
            throw err;
        });
        if(pochette !== undefined){
          pochette.mv(appRoot+"/files/art/"+nomFichierFinal+".jpg", function(err){
            if(err)
              return res.status(500).send(err);
          });
        }
        if(fs.existsSync(appRoot+"/files"+path+".jpg")){
          fs.rename(appRoot+"/files"+path+".jpg",appRoot+"/files/art/"+nomFichierFinal+".jpg",function(err){
            if(err)
              throw err;
          });
        }
        // suppression du fichier json
        fs.unlinkSync(appRoot+"/files"+path+".json");
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

// Suppression d'une plage selon un id passé en paramètre
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

// Mise à jour d'une plage selon un id et un objet plage donné.
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

// Cette fonction récupère toutes les plages de la base et exécute sa fonction callback récupérée en paramètre
exports.listePlages = function(callback){
  database.collection('plage', function(err, collection) {
    collection.find().toArray(function(err, items) {
      callback(items);
    });
  });
}

// Cette fonction récupère toutes les playlists de la base et exécute sa fonction callback récupérée en paramètre
exports.listePlaylist = function(callback){
  database.collection('playlist', function(err, collection){
    collection.find().toArray(function(err, items){
      callback(items);
    });
  });
}

// Récupère une musique selon un id et exécute sa fonction callback
exports.lecteurMusique = function(id, callback){
  database.collection('plage', function(err, collection) {
    var query = {"_id":new mongo.ObjectID(id)};
    collection.find(query).toArray(function(err, item) {
      callback(item);
    });
  });
}

// Récupère plusieurs musiques selon une liste d'ids et exécute sa fonction callback
exports.lecteurPlaylist = function(id, callback){
  var tabIds=[];
  database.collection('playlist', function(err, collection) {
    var query = {"_id":new mongo.ObjectID(id)};
    collection.find(query).toArray(function(err, item) {
      tabIds=item[0].ids.split(",");
      tabIds=tabIds.map(function(row){
        return mongo.ObjectID(row);
      });
      database.collection('plage', function(err, collection){
        collection.find({"_id":{"$in": tabIds}}).toArray(function(err, items){
          callback(items);
        });
      });
    });
  });
}

// Permet d'ajouter une liste de lecture dans la bdd
exports.addPlaylist = function(req, res){
  database.collection('playlist', function(err, collection){
      collection.insertOne(req.body, {safe:true}, function(err, result) {
        if(err)
          res.send({'error':'An error has occurred'});
        else
          res.send("Success!");
      });
  });
}

// Incremente le nombre de likes d'une plage données (id)
exports.likeIncrement = function(req, res){
  database.collection('plage', function(err, collection){
    var query = {"_id":new mongo.ObjectID(req.params.id)};
    collection.updateOne(query,{$inc: {'nbLikes': 1}}, {safe:true}, function(err, result){
      if(err)
        console.log(err);
      else
        res.send("");
    });
  });
}

// Décrémente le nombre de likes d'une plage données (id)
exports.likeDecrement = function(req, res){
  database.collection('plage', function(err, collection){
    var query = {"_id":new mongo.ObjectID(req.params.id)};
    collection.updateOne(query,{$inc: {'nbLikes': -1}}, {safe:true}, function(err, result){
      if(err)
        console.log(err);
      else
        res.send("");
    });
  });
}

// Incremente le nombre d'écoutes d'une plage données (id)
exports.listenIncrement = function(req, res){
  database.collection('plage', function(err, collection){
    var query = {"_id":new mongo.ObjectID(req.params.id)};
    collection.updateOne(query,{$inc: {'nbEcoutes': 1}}, {safe:true}, function(err, result){
      if(err)
        console.log(err);
      else
        res.send("");
    });
  });
}
