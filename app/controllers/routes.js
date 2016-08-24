var express     = require('express'),
    router    = express.Router(),
    type_suite  = require('./SuiteTypeController');

module.exports = function (app){
    app.use('/',router);
    app.use('/api/tipos_habitacion',type_suite);
};
