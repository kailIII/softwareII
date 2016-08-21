const path = require('path')
const Express = require('express')
const bodyParser = require('body-parser');
const auth = require('./auth.js')
const HTML = require('./dynamicHTML.js')

const app = Express()
const port = 8192

const loginRoute = "/login"
const mainBundle = "main.js"
app.use(bodyParser.json()); // for parsing application/json
app.use('/images', Express.static(path.join(__dirname, '..', '/login_assets/images')))
app.use('/production', Express.static(path.join(__dirname, '..', '/production')))

auth.init(app, loginRoute)

// We are going to fill these out in the sections to follow
app.get('/', auth.loginRedirect, function (req, res) {
    const defaultStore = require('../src/app/data/defaultStore.js')
    defaultStore.spreadsheet.totalDays = 14
    res.send(HTML(mainBundle, false, defaultStore))
});

app.post('/hello', function (req, res) {
    console.log('hello')
    res.send("hello")
})

app.listen(port)
