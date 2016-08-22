const sessions = require("client-sessions");
const util = require('util')
const HTML = require('./dynamicHTML.js')
const loginPath ='/login'
const loginBundle ='login.js'
const testingSecret = 'aKdn3rzbvVra5DiZvWzESCrH4ZovKOMldVdUmrgJ9oDZi2TryCQT2VNDJ0SDFZ7'

const userInfo = {user: 'jorge', pass: 'root1234'}
function setLoginRoute(app){
    app.get(loginPath, function (req, res){
        if(req.tabubaSession.loggedIn)
            res.redirect('/')
        else
            res.send(HTML(loginBundle, true))
    })

    app.post('/api/authenticate', function (req, res){
        const postedData = req.body
        let msg
        if(postedData.user === userInfo.user &&
           postedData.pass === userInfo.pass){
            req.tabubaSession.loggedIn = true
            msg = `Hola ${userInfo.user}`
            res.status(200)
        } else {
            res.status(401)
            msg = "Credenciales no validas"
        }
        console.log(msg)
        res.send(msg)
    })
}
function init(app){
    app.use(sessions({
        cookieName: 'tabubaSession', // cookie name dictates the key name added to the request object
        secret: process.SESSION_SECRET || testingSecret, // should be a large unguessable string
        duration: 30 * 60 * 1000, // how long the session will stay valid in ms
        activeDuration: 5 * 60 * 1000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    }));
    setLoginRoute(app)
}

function loginRedirect(req, res, next){
    if(req.tabubaSession.loggedIn){
        next();
    } else {
        res.redirect(loginPath)
    }
}

function verifyLoggedIn(req, res, next){
    if(req.tabubaSession.loggedIn){
        next()
    } else {
        res.status(401)
        res.send("credenciales no válidas")
    }
}

module.exports = {
    init: init,
    loginRedirect: loginRedirect,
    verifyLoggedIn: verifyLoggedIn,
}
