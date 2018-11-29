var express = require('express'),
    plagesRoute = require('./routes/plages'),
    affichageRoute = require('./routes/affichage'),
    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');


app.get('/plages', plagesRoute.findAll);
app.get('/plages/:id', plagesRoute.findById);
app.post('/plages', plagesRoute.addPlage);
app.delete('/plages/:id', plagesRoute.deletePlage);
//app.put('/plages/:id', plagesRoute.updatePlage);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/affichage', affichageRoute);

app.listen(3000);
console.log('Listening on port 3000...');
