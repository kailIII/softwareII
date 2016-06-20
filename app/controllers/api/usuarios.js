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
                    res.send({success:true, user:user,create:true});
                });
            }
        });

});

/*@route: /api/usuarios/edit
  @POST
  @Receives: username, password, apellido, rol, nombre, id_usuario
  @Sends: true and the  user if success, false and the user if not success.
*/
router.post('/edit', function (req, res){
    "use strict"
    var username, password, apellido, rol, nombre, id_usuario;
    id_usuario = req.body.id_usuario;
    username = req.body.username;
    password = req.body.password;
    apellido = req.body.apellido;
    rol= req.body.rol;
    nombre = req.body.nombre;
    Usuario.find({where: {id_usuario: id_usuario}})
        .then(function(user) {
            if(user !== null){
                user.username = username;
                user.password = password;
                user.apellido = apellido;
                user.rol = rol;
                user.nombre = nombre;
                user.save().then(function() {
                    res.send({success:true,create:false});
                });
            }else{
                res.send({success:false});
            }
        });

});

/*@route: /api/usuarios/login
  @POST
  @Receives: username, password
  @Sends: true and the  user if success, false and the user if not success.
*/
router.post('/login',function(req, res){
    "use strict"
    var username, password, apellido, rol, nombre;
    username = req.body.username;
    console.log(req.body.username);
    password = req.body.password;
    console.log(req.body.password);
    Usuario.find({where: {username: username, password:password}})
        .then(function(user) {
            if(user !== null){
                console.log("Usuario se autentico");
                if(req.session.cookie.username){
                    console.log("cookie ya creada");
                    console.log("Usuario: ", req.session.cookie);

                }
                req.session.cookie ={username: username};
                res.send({success: true});
            }else{
                res.send({success: false});
            }
        });
});


router.post('/checklogin',function (req, res) {
    "use strict"
    res.send({sucess:true});
});

/*@route: /api/usuarios/getAll
  @POST
  @Receives: nil
  @Sends: users.
*/
router.post('/getAll',function (req, res) {
    "use strict"
    Usuario.findAll().then(function(users){
        //console.log(typeof(users));
        res.send(users);
    });

    
});

router.post('/delete',function (req,res) {
    "use strict"
    Usuario.destroy(
        {where: {id_usuario: req.body.id_usuario}}
    ).then(function(status){
        res.send({success:true});
    });
});
module.exports = router;
