var express = require('express');
var router = express.Router();

var Cliente = require('../../models').Cliente;
var Nacionalidad = require('../../models').Nacionalidad;
var sequelize  = require('../../../node_modules/sequelize/lib/sequelize');
var db = require('../../../config/configdb');
sequelize = new sequelize(db.development.database,db.development.username,db.development.password);

/*@route: /api/clientes/getClients
  @POST
  @Receives: 
  @Sends: true and the  clients if success, false if not success.
*/
router.post('/getClients', function (req, res){
	"use strict"


	sequelize.query('select * from Cliente left join (Nacionalidad) on (Nacionalidad.id_nacionalidad = Cliente.fk_nacionalidad)',
		{ type:sequelize.QueryTypes.SELECT}).then(function(clients){
		if(clients!== null){
			
			res.send({success: true, clients: clients});
		}else{
			res.send({success: false});
		}
	});
});

/*@route: /api/clientes/create
  @POST
  @Receives: nombre, apellido, cedula, telefono, mail, nacionalidad
  @Sends: true and the client if success
*/
router.post('/create', function (req, res){
	"use strict"
	var nombre = req.body.nombre;
	var apellido = req.body.apellido;
	var cedula = req.body.cedula;
	var telefono = req.body.telefono;
	var mail = req.body.mail;
	var nacionalidad = req.body.nacionalidad;

	Nacionalidad.find({where: {nombre_nacionalidad:nacionalidad}})
		.then(function(result){
			if(result !== null){
				Cliente.create({nombre:nombre, apellido:apellido, cedula:cedula, 
					telefono:telefono, mail:mail, fk_nacionalidad:result.id_nacionalidad
				}).then(function(client){
					sequelize.query(
					'select * from Cliente left join (Nacionalidad) on (Nacionalidad.id_nacionalidad = Cliente.fk_nacionalidad) where Cliente.id_cliente = '
					+ client.id_cliente, { type:sequelize.QueryTypes.SELECT}).then(function(cliente){
						res.send({success:true, client: cliente});
					});
				});
			}else{
				Nacionalidad.create({nombre_nacionalidad:nacionalidad})
					.then(function(nacion){
						if(nacion!==null){
							Cliente.create({nombre:nombre, apellido:apellido, cedula:cedula, 
								telefono:telefono, mail:mail, fk_nacionalidad:nacion.id_nacionalidad
							}).then(function(client){
								sequelize.query(
								'select * from Cliente left join (Nacionalidad) on (Nacionalidad.id_nacionalidad = Cliente.fk_nacionalidad) where Cliente.id_cliente = '
								+ client.id_cliente, { type:sequelize.QueryTypes.SELECT}).then(function(cliente){
									res.send({success:true, client: cliente});
								});
							});
						}		
					});
			}
		});
	
			
});

/*@route: /api/clientes/update
  @POST
  @Receives: clientId, nombre, apellido, cedula, telefono, mail, nacionalidad
  @Sends: true and the client if success, false if not success
*/
router.post('/update', function (req, res){
	"use strict"
	var clientId = req.body.clientId;
	var nombre = req.body.nombre;
	var apellido = req.body.apellido;
	var cedula = req.body.cedula;
	var telefono = req.body.telefono;
	var mail = req.body.mail;
	var nacionalidad = req.body.nacionalidad;

	Nacionalidad.find({where: {nombre_nacionalidad:nacionalidad}})
		.then(function(result){
			if(result !== null){
				Cliente.find({where: {id_cliente: clientId}})
				.then(function(client){
					if(client === null){
						res.send({success: false});
					}else{
						client.updateAttributes({
							nombre: nombre,
			                apellido:apellido,
			                cedula:cedula,
			                telefono:telefono,
			                fk_nacionalidad:result.id_nacionalidad,
			                mail:mail
						}).then(function(client){
							sequelize.query(
							'select * from Cliente left join (Nacionalidad) on (Nacionalidad.id_nacionalidad = Cliente.fk_nacionalidad) where Cliente.id_cliente = '
							+ client.id_cliente, { type:sequelize.QueryTypes.SELECT}).then(function(cliente){
								res.send({success:true, client: cliente});
							});
						});
					}
				}); 
			}else{
				Nacionalidad.create({nombre_nacionalidad:nacionalidad})
					.then(function(nacion){
						if(nacion!==null){
							Cliente.find({where: {id_cliente: clientId}})
								.then(function(client){
									if(client === null){
										res.send({success: false});
									}else{
										client.updateAttributes({
											nombre: nombre,
							                apellido:apellido,
							                cedula:cedula,
							                telefono:telefono,
							                fk_nacionalidad:nacion.id_nacionalidad,
							                mail:mail
										}).then(function(client){
											sequelize.query(
											'select * from Cliente left join (Nacionalidad) on (Nacionalidad.id_nacionalidad = Cliente.fk_nacionalidad) where Cliente.id_cliente = '
											+ client.id_cliente, { type:sequelize.QueryTypes.SELECT}).then(function(cliente){
												res.send({success:true, client: cliente});
											});
										});
									}
								});
						}		
					});
				
			}
		});

	
});

/*@route: /api/clientes/delete
  @POST
  @Receives: clientId
  @Sends: true if success
*/
router.post('/delete', function (req, res){
	"use strict"
	var clientId = req.body.clientId;

	Cliente.destroy({where: {id_cliente: clientId}})
		.then(function() {
		    res.send({success:true});
		  });
});

module.exports = router;

