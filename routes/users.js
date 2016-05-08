var express = require('express');
var router = express.Router();

var Usuario = require('../models').Usuario;
router.get('/', function(req, res, next) {
    Usuario.findAll().then(function(users){

        res.render('login',{
            users: users
        });
    });
});
router.post('/login',function(req,res,next){
    Usuario.find({where:
                  {'username':req.body.username,
		   'password': req.body.password}})
        .then(function(usuario) {
            if(usuario === null){
                res.render('login',{
                    estado_login: 0
                });
            }else{
                console.log(usuario);
                res.send(usuario);
            }
        });
});
module.exports = router;
