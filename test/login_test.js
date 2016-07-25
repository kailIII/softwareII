const request = require("request");
const superagent = require("superagent");
const expect = require("chai").expect;
const app = require("../app");
//Test del login en la app

describe("Funcionalidad de realizar login", function () {
    it("login",function () {
        superagent 
            .post("localhost:8080/api/usuarios/login")
            .send({"username":"root",
                   "password":"123"})
            .end(function (err, res) {
                //if(err) return done(err);
                //res.body.should.have.property('success');
                expect(res.body.success).to.equal(true);
                done();
            })
    })
});

describe('carga del login', function(){
    it('should respond to GET',function(done){
        superagent
            .get('http://localhost:8080')
            .end(function(err,res){
                expect(res.status).to.equal(200);
                done();
            })
    })
});

describe("Funcionalidad de realizar login", function () {
    it("login",function () {
        superagent
            .post("localhost:8080/api/usuarios/login")
            .send({"username":"root",
                   "password":""})
            .end(function (err, res) {
                expect(res.body.success).to.equal(false);
                done();
            })
    })
});
