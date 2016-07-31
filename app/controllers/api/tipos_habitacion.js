var express = require('express');
var router = express.Router();

var Tipos_habitacion = require('../../models').Habitacion_Tipo;
var tipos_habitacion_fotos = require('../../models').Habitacion_Tipo_Foto;

/*@route: /api/tipos_habitacion/show
   @POST
   @Receives: nil
   @Sends: all the instances of the types of suites
 */

router.post('/show', function (req, res){
    Tipos_habitacion.findAll().then(function(tipos){
        console.log("__SERVIDOR__ se muestran los tipos: ");
        var _tipos = JSON.parse(JSON.stringify(tipos));
        console.log(_tipos);
        res.json(_tipos);
        // return tipos;
    });
});

/*@route: /api/tipos_habitacion/save
   @POST
   @Receives: a fake id or a real id to update, a title and a description of a suite type;
   @Sends: if create, sends the saved new instance, succes true and create as true;
   if update sends create false and success true
 */
router.post('/save', function (req, res){
    'use strict';
    console.log("__SERVIDOR__ guardando...");
    let tipo_habitacion = req.body.title;
    let descripcion = req.body.description;
    let id = req.body.id;
    if (id < 0) {
        Tipos_habitacion.create({
            tipo: tipo_habitacion,
            descripcion: descripcion,
            ruta_foto: "images/room-types/room595_1_thumb.jpg",
        }).then(function(tipo) {
            console.log("__SERVIDOR__ se guardó nuevo tipo ");
            res.json({
                success: true,
                tipo: JSON.parse(JSON.stringify(tipo)),
                create: true,
            });
        });
    }
    else{
        Tipos_habitacion.update({
            tipo: tipo_habitacion,
            descripcion: descripcion,
        },{
            where:{
                id_habitacion_tipo: id
            }

        }).then(function() {
            console.log("__SERVIDOR__ se actualizó tipo habitación");
            res.json({
                create: false,
                success: true
            });
        });
    }
});

/*@route: /api/tipos_habitacion/delete
   @POST
   @Receives: an id of the instance to delete
   @Sends: success true
 */
router.post('/delete', function (req, res){
    "use strict"
    Tipos_habitacion.destroy(
        {where: {id_habitacion_tipo: req.body.id}}
    ).then(function(status){
        res.json({success:true});
    });
});

module.exports = router;
