var request = require("request");
var expect = require("chai").expect();
var app = require("../app");
//Test del login en la app
describe("Prueba del login", function () {
    var url = "http://localhost:3000/api/usuarios/login";
    it("login http request",function () {
	request(app)
	    .post("/api/usuarios/login")
	    .expect(200)
	    .send({"username":"root",
		   "password":"123"})	    
	    .end(function (err, res) {
		if(err) return done(err);
		res.body.should.have.property('success');
		done();
	    })
    }) 
});
