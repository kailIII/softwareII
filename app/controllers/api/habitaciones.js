var express = require('express');
var router = express.Router();

var Habitacion = require('../../models').Habitacion;


router.post('/getSuites', function (req, res){
        "use strict"
        var habs = Habitacion.findAll().then(function(suites){
                if(suites!== null){
                        res.send({success: true, suites: suites});
                }else{
                        res.send({success: false});
                }
        });
});

/*@route: /api/habitaciones/create
  @POST
  @Receives: nombreHabitacion, tipoHabitacion, capacidad, estado, tarifa
  @Sends: true and the  suite if success, false and the suite if not success.
*/
router.post('/create', function (req, res){
        "use strict"
        var nombreHab = req.body.nombreHabitacion;
        var tipoHab = req.body.tipoHabitacion;
        var capacidad = req.body.capacidad;
        var estado = req.body.estado;
        var tarifa = req.body.tarifa;

        Habitacion.find({where: {nombre: nombreHab}})
                .then(function(suite){
                        if(suite !== null){
                                res.send({success: false});
                        }else{
                                Habitacion.create({nombre:nombreHab, tipo:tipoHab, capacidad:capacidad, estado:estado, tarifa:tarifa
                                }).then(function(suite){
                                        res.send({success:true, suite:suite});
                                });
                        }
        });
});


/*@route: /api/habitaciones/create
  @POST
  @Receives: nombreHabitacion, tipoHabitacion, capacidad, estado, tarifa
  @Sends: true and the  suite if success, false and the suite if not success.
*/
router.post('/update', function (req, res){
        "use strict"
        var suiteId = req.body.suiteId;
        var nombreHab = req.body.nombreHabitacion;
        var tipoHab = req.body.tipoHabitacion;
        var capacidad = req.body.capacidad;
        var estado = req.body.estado;
        var tarifa = req.body.tarifa;

        Habitacion.find({where: {id_habitacion: suiteId}})
                .then(function(suite){
                        if(suite === null){
                                res.send({success: false});
                        }else{
                                suite.updateAttributes({nombre:nombreHab, tipo:tipoHab, capacidad:capacidad, estado:estado, tarifa:tarifa
                                }).then(function(suite){
                                        res.send({success:true, suite:suite});
                                });
                        }
        }); 
});

router.post('/delete', function (req, res){
        "use strict"
        var suiteId = req.body.suiteId;

        Habitacion.destroy({where: {id_habitacion: suiteId}})
                .then(function() {
                    res.send({success:true});
                  });
});

module.exports = router;

