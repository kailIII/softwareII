const express     = require('express'),
      glob            = require('glob'),
      config          = require('./config/config'),
      cookieParser    = require('cookie-parser'),
      bodyParser      = require('body-parser'),
      session         = require('express-session'),
      favicon         = require('serve-favicon'),
      routes = require('./app/controllers/routes.js');
var fs          = require('fs');

var path = require('path');
var app = express();
const port = 8080;
var sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

/*session*/
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized:true
}));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

var models = require("./app/models");

var TYPES_FILE = path.join(__dirname, 'tilesdata.json');

var usuarios = require('./app/controllers/api/usuarios');
var habitaciones = require('./app/controllers/api/habitaciones');
var tipos_habitacion = require('./app/controllers/api/tipos_habitacion');

app.use('/api/usuarios',usuarios);
app.use('/api/habitaciones', habitaciones);
app.use('/api/tipos_habitacion',tipos_habitacion);

models.sequelize.sync().then(function () {
    "use strict"
    app.listen(port, function () {
        console.log('Application listening on  port ' + config.port);
    });
});
