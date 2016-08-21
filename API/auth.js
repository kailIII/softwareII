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

    app.post('/authenticate', function (req, res){
        const postedData = req.body
        if(postedData.user === userInfo.user &&
           postedData.pass === userInfo.pass){
            req.tabubaSession.loggedIn = true
            res.status(200)
            res.send(`Hola ${userInfo.user}`)
        } else {
            res.status(401)
            res.send("Credenciales no validas")
        }
    })
}
function init(app){
    app.use(sessions({
        cookieName: 'tabubaSession', // cookie name dictates the key name added to the request object
        secret: process.SESSION_SECRET || testingSecret, // should be a large unguessable string
        duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
        activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
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

module.exports = {
    init: init,
    loginRedirect: loginRedirect,
}
