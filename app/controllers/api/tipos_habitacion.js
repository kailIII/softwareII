var express = require('express');
var router = express.Router();

var tipos_habitacion = require('../../models').Habitacion_Tipo;
var tipos_habitacion_fotos = require('../../models').Habitacion_Tipo_Foto;

/*@route: /api/tipos_habitacion/show
  @POST
  @Receives: nil
  @Sends: true and the  user if success, false and the user if not success.
*/

router.post('/show', function (req, res){
    tipos_habitacion.findAll().then(function(tipos){
        console.log("se muestran los tipos: ");
        var _tipos = JSON.parse(JSON.stringify(tipos));
        console.log(_tipos);
        res.json(_tipos);
        // return tipos;
    });
});

router.post('/save', function (req, res){
    console.log("guardando...")
    var tipo_habitacion = req.body.title;
    var descripcion = req.body.description;
    tipos_habitacion.create({
        tipo : tipo_habitacion,
        descripcion : descripcion,
        ruta_foto : "images/room-types/room595_1_thumb.jpg"
    }).then(function(){
        console.log("se guardó nuevo tipo ");
        res.json({state: "ok"});
    });
});

module.exports = router;
