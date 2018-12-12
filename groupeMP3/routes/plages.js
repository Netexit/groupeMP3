var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    MongoClient = mongo.MongoClient,
    ObjectID = mongo.ObjectID,
    database;

//var server = new Server('localhost', 27017, {auto_reconnect: true}),
//    database;
//
//var mongoClient= new MongoClient(server);

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
    //collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
    //  res.send(item);
    //});
    var query = {idPlage:id};
    collection.find(query).toArray(function(err, item) {
      console.log(item);
      res.send(item);
    });
  });
};


exports.addPlage = function(req, res) {
  var plage = req.body;
  console.log('Adding plage: ' + JSON.stringify(plage));
  database.collection('plage', function(err, collection) {
    collection.insertOne(plage, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

exports.deletePlage = function(req, res) {
  var id = req.params.id;
  console.log('Deleting plage: ' + id);
  database.collection('plage', function(err, collection) {
    var query = {idPlage:id};
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
    var query = {idPlage:id};
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

exports.countPlages = function(req, res){
  database.collection('plage', function(err, collection){
    collection.countDocuments(function(err, count) {
      res.send({count : count});
    })
  });
}
