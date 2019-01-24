var express = require('express'),
    plagesRoute = require('./routes/plages'),
    affichageRoute = require('./routes/affichage'),
    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users');
    uploadRouter = require('./routes/upload'),
    listeRouter = require('./routes/liste'),
    lecteurRouter = require('./routes/lecteur'),
    liste2Router = require('./routes/liste2'),
    liste3Router = require('./routes/liste3'),
    ajoutPlaylistRouter = require('./routes/ajoutPlaylist'),
    listePlaylistRouter = require('./routes/listePlaylist');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload');

// Définit le dossier racine dans une variable globale appRoot
global.appRoot = path.resolve(__dirname);

// Déclare les différents packages utilisés
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

// Création d'un cookie clientside si nécessaire
app.use(function(req,res,next){
  // cookie existant clientside ?
  var cookieGroupeMP3 = req.cookies.groupeMP3;
  var cookieLikes = req.cookies.likes;
  if(cookieGroupeMP3 === undefined || cookieLikes === undefined){
    // NON
    // création du cookie
    var randNumb=Math.random().toString();
    randNumb=randNumb.substring(2,randNumb.length);
    res.cookie('groupeMP3',randNumb,{maxAge:900000,httpOnly:true});
    res.cookie('likes','',{maxAge:900000,httpOnly:false});
    console.log("cookie créé");
  }
  else{
    // OUI
    //cookie existant
    console.log("cookie existe", cookieGroupeMP3);
  }
  next();
});

// Définit les dossiers où se trouvent respectivement : les vues et les ressources techniques (css, js, ...)
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // dossier où le framework va chercher les ressources
app.use(express.static(appRoot+'/files/'));// second dossier
app.set('view engine', 'jade');


// Les lignes qui suivent définissent toutes les pages accessibles selon le protocole HTTP renseigné, ainsi que les routes auxquelles elles sont référées.
// API REST
app.get('/plages', plagesRoute.findAll);
app.get('/plages/:id', plagesRoute.findById);
app.post('/plages', plagesRoute.addPlage);
app.delete('/plages/:id', plagesRoute.deletePlage);
app.put('/plages/:id', plagesRoute.updatePlage);

// AJOUT RESTFUL PLAYLIST
app.post('/playlist', plagesRoute.addPlaylist);

// INCREMENT/DECREMENT likes
app.post('/like/:id', plagesRoute.likeIncrement);
app.post('/dislike/:id', plagesRoute.likeDecrement);

// INCREMENT/DECREMENT écoutes
app.post('/listen/:id', plagesRoute.listenIncrement);

// PAGES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/affichage', affichageRoute); // plateforme de test CRUD
app.use('/upload', uploadRouter); // plateforme d'administration pour ajout par upload de mp3
app.use('/liste', listeRouter); // liste redirigeant l'utilisateur vers le lecteur
app.use('/lecteur', lecteurRouter); // le lecteur
app.use('/liste2', liste2Router); // liste contenant une iframe du lecteur en fonction de la musique écoutée
app.use('/liste3', liste3Router); // liste requêtant les informations de la musique à écouter en ajax
app.use('/ajoutPlaylist', ajoutPlaylistRouter);
app.use('/listePlaylist', listePlaylistRouter);

// Lance le serveur en écoute sur le port 3000
app.listen(3000);
console.log('Listening on port 3000...');
