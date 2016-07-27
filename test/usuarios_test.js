var request = require("request");
var superagent = require("superagent");
var chai = require("chai");
var expect = chai.expect;

/////////////Tests de crear un suario

describe("Crear nuevo usuario", function () {
    it(" Ingreso del nombre y apellido del usuario usando caracteres alfabeticos",function () {
        superagent
            .post("localhost:8080/api/usuarios/create")
            .send({"username":"root",
                   "password":"abc123",
			   	   "apellido":"Palomeque",
			       "rol":"Administrador",
			       "nombre":"Diego"})
            .end(function (err, res) {
              console.log("corrio la prueba de crear nuevo usuario")
                expect(res.body.success).to.equal(true);
                done();
            })
    })
});

describe("Crear nuevo usuario", function () {
    it("Ingreso del nombre y apellido del usuario usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/usuarios/create")
            .send({"username":"root1",
                   "password":"abc",
                   "apellido":"124abc",
                   "rol":"Administrador",
                   "nombre":"1dg23"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo usuario", function () {
    it("Ingreso del username y password del usuario usando caracteres especiales",function () {
        superagent
            .post("localhost:8080/api/usuarios/create")
            .send({"username":"% ^&",
                   "password":"&*()",
                   "apellido":"Caceres",
                   "rol":"Administrador",
                   "nombre":"Andres"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo usuario", function () {
    it("Ingreso del rol del usuario usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/usuarios/create")
            .send({"username":"root2",
                   "password":"abc123",
                   "apellido":"Izquierdo",
                   "rol":"Administrador123",
                   "nombre":"Daniel"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo usuario", function () {
    it("Ingreso de datos del nuevo usuario usando los mismos datos de otro usuario ya existente",function () {
        superagent
            .post("localhost:8080/api/usuarios/create")
            .send({"username":"root",
                   "password":"abc123",
             "apellido":"Palomeque",
             "rol":"Administrador",
             "nombre":"Diego"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

///////////////Tests de Actualizar los datos de un suario

describe("Actualizar los datos de un usuario", function () {
    it(" Actualizar el nombre y apellido de un usuario usando caracteres alfabeticos",function () {
        superagent
            .post("localhost:8080/api/usuarios/edit")
            .send({"username":"roota",
                   "password":"123a",
             "apellido":"apellidoh",
             "rol":"Administrador",
             "nombre":"nombreh",
             "id_usuario":4})
            .end(function (err, res) {
                expect(res.body.success).to.equal(true);
                done();
            })
    })
});

describe("Actualizar los datos de un usuario", function () {
    it("Actualizar el nombre y apellido de un usuario usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/usuarios/edit")
            .send({"username":"rootb",
                   "password":"123b",
                   "apellido":"124abc",
                   "rol":"Administrador",
                   "nombre":"1dg23",
                   "id_usuario":5})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un usuario", function () {
    it("Actualizar el username y password de un usuario usando caracteres especiales",function () {
        superagent
            .post("localhost:8080/api/usuarios/edit")
            .send({"username":"#root%",
                   "password":"(*)123",
                   "apellido":"apellidoc",
                   "rol":"Administrador",
                   "nombre":"nombrec",
                   "id_usuario":6})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un usuario", function () {
    it("Actualizar el rol de un usuario usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/usuarios/edit")
            .send({"username":"rootd",
                   "password":"123d",
                   "apellido":"apellidod",
                   "rol":"Admin342",
                   "nombre":"nombred",
                   "id_usuario":7})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un usuario", function () {
    it("Actualizar los datos de un usuario usando los mismos datos de otro usuario ya existente",function () {
        superagent
            .post("localhost:8080/api/usuarios/edit")
            .send({"username":"rootf",
                   "password":"123f",
             "apellido":"apellidof",
             "rol":"Administrador",
             "nombre":"nombref",
             "id_usuario":4})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

///////////////Tests de Eliminar un suario

describe("Eliminar un usuario", function () {
    it("Eliminar un usuario usando un id existente",function () {
        superagent
            .post("localhost:8080/api/usuarios/delete")
            .send({"id_usuario":9})
            .end(function (err, res) {
                expect(res.body.success).to.equal(true);
                done();
            })
    })
});

describe("Eliminar un usuario", function () {
    it("Eliminar un usuario usando un id no existente",function () {
        superagent
            .post("localhost:8080/api/usuarios/delete")
            .send({"id_usuario":2000})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});