var express = require('express'),
    plagesRoute = require('./routes/plages'),
    affichageRoute = require('./routes/affichage'),
    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users');
    uploadRouter = require('./routes/upload'),
    listeRouter = require('./routes/liste'),
    lecteurRouter = require('./routes/lecteur'),
    liste2Router = require('./routes/liste2'),
    liste3Router = require('./routes/liste3');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload');

global.appRoot = path.resolve(__dirname);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

app.use(function(req,res,next){
  //envoi du cookie par client ?
  var cookieGroupeMP3 = req.cookies.groupeMP3;
  var cookieLikes = req.cookies.likes;
  if(cookieGroupeMP3 === undefined || cookieLikes === undefined){
    //création du cookie
    var randNumb=Math.random().toString();
    randNumb=randNumb.substring(2,randNumb.length);
    res.cookie('groupeMP3',randNumb,{maxAge:900000,httpOnly:true});
    res.cookie('likes','',{maxAge:900000,httpOnly:false});
    console.log("cookie créé");
  }
  else{
    //cookie existant
    console.log("cookie existe", cookieGroupeMP3);
  }
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(appRoot+'/files/'));// a modifier en fct de testGroupeMP3 | permet d'afficher la pochette de l'album générée par upload
app.set('view engine', 'jade');

// API REST
app.get('/plages', plagesRoute.findAll);
app.get('/plages/:id', plagesRoute.findById);
app.post('/plages', plagesRoute.addPlage);
app.delete('/plages/:id', plagesRoute.deletePlage);
app.put('/plages/:id', plagesRoute.updatePlage);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/affichage', affichageRoute); // plateforme de test CRUD
app.use('/upload', uploadRouter); // plateforme d'administration pour ajout par upload de mp3
app.use('/liste', listeRouter);
app.use('/lecteur', lecteurRouter);
app.use('/liste2', liste2Router);
app.use('/liste3', liste3Router);
app.listen(3000);

console.log('Listening on port 3000...');
module.exports = app;
