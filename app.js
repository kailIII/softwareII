const express     = require('express'),
      glob            = require('glob'),
      config          = require('./config/config'),
      cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
      favicon         = require('serve-favicon'),
      routes = require('./app/controllers/routes.js');
      fs          = require('fs');

var path = require('path');
var app = express();
const port = 8080;

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());


// app.get('/', function (req, res) {
//       res.send('Hello World!');
// });
// var controllers = glob.sync(config.root + '/app/controllers/*.js');
// controllers.forEach(function (controller) {
//   require(controller)(app);
// });

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

//POSTs que deberían estar en SuiteTypeController

var TYPES_FILE = path.join(__dirname, 'tilesdata.json');

app.post('/api/tipos_habitacion', function (req, res){
    fs.readFile(TYPES_FILE, function(err, data){
      if (err){
        console.error(err);
        process.exit(1);
      }
      res.json(JSON.parse(data));
    });
  });

app.post('/api/save_tipo_hab',function (req,res){
    fs.readFile(TYPES_FILE, function(err, data){
      if (err){
        console.error(err);
        process.exit(1);
      }
      var types = JSON.parse(data);

      var newType = {
        title: req.body.title,
        img:"images/room-types/room595_thumb.jpg",
        description: req.body.description,
      };

      types.push(newType);
      fs.writeFile(TYPES_FILE, JSON.stringify(types, null, 4),function (err){
      if (err){
        console.error(err);
        process.exit(1);
      }
      res.json(types);
      })
    });
});

////////////////////////////////////////////

app.listen(port, function () {
    console.log('Application listening on  port ' + config.port);
});
