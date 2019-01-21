var express = require('express'),
    plagesRoute = require('./routes/plages'),
    affichageRoute = require('./routes/affichage'),
    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users');
    uploadRouter = require('./routes/upload');
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


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(appRoot+'/files'));// a modifier en fct de testGroupeMP3 | permet d'afficher la pochette de l'album générée par upload
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
app.listen(3000);

console.log('Listening on port 3000...');
module.exports = app;
