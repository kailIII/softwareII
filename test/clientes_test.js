var request = require("request");
var superagent = require("superagent");
var chai = require("chai");
var expect = chai.expect;
var assert = chai.assert;

/////////////Tests de crear un cliente

describe("Crear nuevo cliente", function () {
    it(" Ingreso del nombre y apellido del cliente usando caracteres alfabetico",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"Diego",
                   "apellido":"Palomeque",
                   "cedula":"0934758364",
                   "telefono":"2358473",
                   "mail":"abc@gmail.com",
                   "nacionalidad":"Ecuatoriana"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo cliente", function () {
    it("Ingreso del nombre y apellido del cliente usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"1dg23",
                   "apellido":"124abc",
                   "cedula":"0927346572",
                   "telefono":"2399384",
                   "mail":"abc1@gmail.com",
                   "nacionalidad":"Ecuatoriana"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo cliente", function () {
    it("Ingreso de la cedula del cliente usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"Andres",
                   "apellido":"Caceres",
                   "cedula":"acb1234",
                   "telefono":"0997234172",
                   "mail":"abc2@gmail.com",
                   "nacionalidad":"Chilena"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo cliente", function () {
    it("Ingreso de la cedula del cliente usando caracteres especiales",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"Daniel",
                   "apellido":"Izquierdo",
                   "cedula":"092$%36841",
                   "telefono":"09972837486",
                   "mail":"abc3@gmail.com",
                   "nacionalidad":"Argentino"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo cliente", function () {
    it("Ingreso de la cedula del cliente usando un numero de caracteres numericos deiferente de 10",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"Gabriel",
                   "apellido":"Aumala",
                   "cedula":"0913647291283",
                   "telefono":"23748374",
                   "mail":"abc4@gmail.com",
                   "nacionalidad":"Ecuatoriana"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo cliente", function () {
    it("Ingreso del telefono del cliente usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"Pedro",
                   "apellido":"gomez",
                   "cedula":"0929432761",
                   "telefono":"2346abc",
                   "mail":"abc5@gmail.com",
                   "nacionalidad":"Ecuatoriana"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo cliente", function () {
    it("Ingreso del telefono del cliente usando caracteres especiales",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"Leonardo",
                   "apellido":"velez",
                   "cedula":"09221347362",
                   "telefono":"23*()12",
                   "mail":"abc6@gmail.com",
                   "nacionalidad":"Ecuatoriana"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo cliente", function () {
    it("Ingreso del telefono del cliente usando mas de 10 caracteres numericos",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"Adriana",
                   "apellido":"Espinoza",
                   "cedula":"0916372847",
                   "telefono":"213524673812",
                   "mail":"abc7@gmail.com",
                   "nacionalidad":"Ecuatoriana"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo cliente", function () {
    it("Ingreso del correo del cliente usando un formato incorrecto",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"Cristian",
                   "apellido":"Salas",
                   "cedula":"0914635271",
                   "telefono":"0998927381",
                   "mail":"abc8gmail.com",
                   "nacionalidad":"Ecuatoriana"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Crear nuevo cliente", function () {
    it("Ingreso de datos del nuevo cliente usando los mismos datos de otro cliente ya existente",function () {
        superagent
            .post("localhost:8080/api/clientes/create")
            .send({"nombre":"Diego",
                   "apellido":"Palomeque",
                   "cedula":"0934758364",
                   "telefono":"2358473",
                   "mail":"abc@gmail.com",
                   "nacionalidad":"Ecuatoriana"})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

///////////////Tests de Actualizar los datos de un cliente

describe("Actualizar los datos de un cliente", function () {
    it(" Ingreso del nombre y apellido del cliente usando caracteres alfabeticos",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"nombrem",
                   "apellido":"apellidom",
                   "cedula":"0923617890",
                   "telefono":"2345172",
                   "mail":"abc1@espol.edu.ec",
                   "nacionalidad":"Ecuatoriana",
                   "clientId":15})    
            .end(function (err, res) {
                expect(res.body.success).to.equal(true);
                done();
            })
    })
});

describe("Actualizar los datos de un cliente", function () {
    it("Ingreso del nombre y apellido del cliente usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"1dg234",
                   "apellido":"bc273",
                   "cedula":"0917786621",
                   "telefono":"2314767",
                   "mail":"abc2@espol.edu.ec",
                   "nacionalidad":"Ecuatoriana",
                   "clientId":16})          
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un cliente", function () {
    it("Ingreso de la cedula del cliente usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"nombren",
                   "apellido":"apellidon",
                   "cedula":"0923516abc",
                   "telefono":"2362537",
                   "mail":"abc3@espol.edu.ec",
                   "nacionalidad":"Ecuatoriana",
                   "clientId":17})          
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un cliente", function () {
    it("Ingreso de la cedula del cliente usando caracteres especiales",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"nombrep",
                   "apellido":"apellidop",
                   "cedula":"091*&223421",
                   "telefono":"0997827151",
                   "mail":"abc4@espol.edu.ec",
                   "nacionalidad":"Chilena",
                   "clientId":18})          
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un cliente", function () {
    it("Ingreso de la cedula del cliente usando un numero de caracteres numericos deiferente de 10",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"nombreq",
                   "apellido":"apellidoq",
                   "cedula":"09231",
                   "telefono":"2134562",
                   "mail":"abc4@espol.edu.ec",
                   "nacionalidad":"Argentino",
                   "clientId":19})    
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un cliente", function () {
    it("Ingreso del telefono del cliente usando caracteres alfanumericos",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"nombrer",
                   "apellido":"apellidor",
                   "cedula":"09242617236",
                   "telefono":"23647ab",
                   "mail":"abc5@espol.edu.ec",
                   "nacionalidad":"Ecuatoriana",
                   "clientId":20})    
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un cliente", function () {
    it("Ingreso del telefono del cliente usando caracteres especiales",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"nombres",
                   "apellido":"apellidos",
                   "cedula":"0936775583",
                   "telefono":"231#$31",
                   "mail":"abc6@espol.edu.ec",
                   "nacionalidad":"Ecuatoriana",
                   "clientId":21})    
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un cliente", function () {
    it("Ingreso del telefono del cliente usando mas de 10 caracteres numericos",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"nombreu",
                   "apellido":"apellidou",
                   "cedula":"0915263547",
                   "telefono":"091537263511",
                   "mail":"abc7@espol.edu.ec",
                   "nacionalidad":"Ecuatoriana",
                   "clientId":22})    
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un cliente", function () {
    it("Ingreso del correo del cliente usando un formato incorrecto",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"nombrev",
                   "apellido":"apellidov",
                   "cedula":"0923546372",
                   "telefono":"2345163",
                   "mail":"abc0espol.edu.ec",
                   "nacionalidad":"Ecuatoriana",
                   "clientId":23})    
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

describe("Actualizar los datos de un cliente", function () {
    it("Ingreso de datos del cliente a modificar usando los mismos datos de otro cliente ya existente",function () {
        superagent
            .post("localhost:8080/api/clientes/update")
            .send({"nombre":"nombrem",
                   "apellido":"apellidom",
                   "cedula":"0923617890",
                   "telefono":"2345172",
                   "mail":"abc1@espol.edu.ec",
                   "nacionalidad":"Ecuatoriana",
                   "clientId":25})    
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});

///////////////Tests de Eliminar un cliente

describe("Eliminar un usuario", function () {
    it("Eliminar un cliente usando un id existente",function () {
        superagent
            .post("localhost:8080/api/clientes/delete")
            .send({"clientId":26})
            .end(function (err, res) {
                expect(res.body.success).to.equal(true);
                done();
            })
    })
});

describe("Eliminar un usuario", function () {
    it("Eliminar un cliente usando un id existente",function () {
        superagent
            .post("localhost:8080/api/clientes/delete")
            .send({"clientId":7000})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});