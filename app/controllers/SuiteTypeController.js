var express = require('express');
var fs = require('fs');
var path = require('path');

var TYPES_FILE = path.join(__dirname, 'tilesdata.json');

module.exports = function (app) {
  app.post('/api/tipos_habitacion', function (req, res){
    fs.readFile(TYPES_FILE, function(err, data){
      if (err){
        console.error(err);
        process.exit(1);
      }
      res.json(JSON.parse(data));
    });
  });
}
