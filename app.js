var express = require('express');

/*Middlewares utilizados ...*/
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


/*Controladores utilizados crearlos en el directorio routes.*/
var routes = require('./routes/index');
var users = require('./routes/users');
var models = require("./models");
var app = express();


/*JSX ENGINE UTILIZADO GRACIAS A EXPRESS*/
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/', routes);
app.use('/users', users);
//app.use('/users/login',users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*Sintaxis utilizada para regenerar las tablas en la base de datos, no afecta a los registros. Revisar modelos.*/
models.sequelize.sync().then(function () {
    app.listen(3000, function () {
        console.log('Application listening on  port 3000');
    });
});
