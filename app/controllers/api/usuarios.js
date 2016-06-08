var express = require('express');
var router = express.Router();

var Usuario = require('../../models').Usuario;

/*@route: /api/usuarios/create
  @POST
  @Receives: username, password, apellido, rol, nombre
  @Sends: true and the  user if success, false and the user if not success.
*/
router.post('/create', function (req, res){
    "use strict"
    var username, password, apellido, rol, nombre;
    username = req.body.username;
    console.log(req.body.username);
    password = req.body.password;
    console.log(req.body.password);
    apellido = req.body.apellido;
    console.log(req.body.apellido);
    rol= req.body.rol;
    console.log(req.body.rol);
    nombre = req.body.nombre;
    console.log(req.body.nombre);
    Usuario.find({where: {username: username}})
        .then(function(user) {
            if(user !== null){
                console.log("Usuario existe en la base");
                res.send({success: false});
            }else{
                Usuario.create({username: username, password:password, apellido: apellido, rol: rol, nombre: nombre}).then(function(user){
                    console.log("se creo el usuario");
                    console.log(user);
                    res.send({success:true, user:user});
                });
            }
        });

});

module.exports = router;
