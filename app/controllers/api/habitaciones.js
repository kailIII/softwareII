var express = require('express');
var router = express.Router();

var Habitacion = require('../../models').Habitacion;
var Habitacion_Tipo = require('../../models').Habitacion_Tipo;
var sequelize  = require('../../../node_modules/sequelize/lib/sequelize');
var db = require('../../../config/configdb');
sequelize = new sequelize(db.development.database,db.development.username,db.development.password);
/*@route: /api/habitaciones/getsuites
  @POST
  @Receives: 
  @Sends: true and the  suites if success, false if not success.
*/
router.post('/getSuites', function (req, res){
	"use strict"

	
	sequelize.query('select * from Habitacion left join (Habitacion_Tipo) on (Habitacion_Tipo.id_habitacion_tipo = Habitacion.fk_tipo)',
		{ type:sequelize.QueryTypes.SELECT}).then(function(suites){
		
		if(suites!== null){res.send({success: true, suites: suites});
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
	var numeroHab = req.body.numeroHabitacion;
	var tipoHab = req.body.tipoHabitacion;
	var capacidad = req.body.capacidad;
	var estado = req.body.estado;

	Habitacion.find({where: {numero: numeroHab}})
		.then(function(suite){
			if(suite !== null){
				res.send({success: false});
			}else{
				Habitacion_Tipo.find({where: {tipo:tipoHab}})
					.then(function(tipoH){
						if(tipoH===null){
							res.send({success:false});
						}else{
							Habitacion.create({numero:numeroHab, tipo:tipoHab, capacidad:capacidad, estado:estado
							, fk_tipo: tipoH.id_habitacion_tipo}).then(function(suite){
								sequelize.query(
									'select * from Habitacion left join (Habitacion_Tipo) on (Habitacion_Tipo.id_habitacion_tipo = Habitacion.fk_tipo) where Habitacion.id_habitacion = '
									+ suite.id_habitacion, { type:sequelize.QueryTypes.SELECT}).then(function(habitacion){
										res.send({success:true, suite:habitacion});
									});
							});
						}
					});
			}
	});
});


/*@route: /api/habitaciones/update
  @POST
  @Receives: suiteId, nombreHabitacion, tipoHabitacion, capacidad, estado, tarifa
  @Sends: true and the  suite if success, false and the suite if not success.
*/
router.post('/update', function (req, res){
	"use strict"
	var suiteId = req.body.suiteId;
	var numeroHab = req.body.numeroHabitacion;
	var tipoHab = req.body.tipoHabitacion;
	var capacidad = req.body.capacidad;
	var estado = req.body.estado;

	Habitacion.find({where: {id_habitacion: suiteId}})
		.then(function(suite){
			if(suite === null){
				res.send({success: false});
			}else{
				Habitacion_Tipo.find({where: {tipo:tipoHab}})
					.then(function(tipoH){
						if(tipoH===null){
							res.send({success:false});
						}else{
							suite.updateAttributes({numero:numeroHab, tipo:tipoHab, capacidad:capacidad, estado:estado
							, fk_tipo: tipoH.id_habitacion_tipo}).then(function(suite){
								sequelize.query(
									'select * from Habitacion left join (Habitacion_Tipo) on (Habitacion_Tipo.id_habitacion_tipo = Habitacion.fk_tipo) where Habitacion.id_habitacion = '
									+ suite.id_habitacion, { type:sequelize.QueryTypes.SELECT}).then(function(suite){
										res.send({success:true, suite:suite});
									});
							});
						}
					});
			}
	}); 
});

/*@route: /api/habitaciones/delete
  @POST
  @Receives: suiteId
  @Sends: true if success
*/
router.post('/delete', function (req, res){
	"use strict"
	var suiteId = req.body.suiteId;

	Habitacion.destroy({where: {id_habitacion: suiteId}})
		.then(function() {
		    res.send({success:true});
		  });
});

module.exports = router;

