const path = require('path')
const Express = require('express')
const bodyParser = require('body-parser');
const sequelize = require('sequelize')

const auth = require('./auth.js')
const HTML = require('./dynamicHTML.js')
const storage = require('./stateStorage.js')

const ReservationBroker = require('../src/app/components/pages/spreadsheet/ReservationBroker.js')
const ReservationStatus = require('../constants/ReservationStatus.js')
const app = Express()
const port = process.env.PORT || 8192

const mainBundle = "main.js"
app.use(bodyParser.json()); // for parsing application/json
app.use('/images', Express.static(path.join(__dirname, '..', '/login_assets/images')))
app.use('/production', Express.static(path.join(__dirname, '..', '/production')))

auth.init(app)

// We are going to fill these out in the sections to follow
app.get('/', auth.loginRedirect, function (req, res) {
    const defaultStore = Object.assign({}, require('../src/app/data/defaultStore.js'))
    defaultStore.reservations = storage.getReservations()
    defaultStore.spreadsheet.totalDays = 14
    res.send(HTML(mainBundle, false, defaultStore))
});

app.post('/api/reservation/new', auth.verifyLoggedIn, function (req, res) {

    const reservationArray = storage.getReservations().values
    const roomArray = storage.getRooms()
    const firstDate = storage.getSpreadsheet().firstDate
    const guestName = req.body.guestName

    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)
    const validation = ReservationBroker.validateNewReservation(req.body.desiredRoom,
          guestName, firstDate, startDate, endDate)
    if(!validation.error){
        const newReservation = ReservationBroker.findAvailableReservation(roomArray,
          reservationArray, req.body.desiredRoom, validation.startIndex,
          validation.endIndex, guestName)
        if(newReservation){
            const reservationIndex = ReservationBroker.getLastIndexOfRoom(reservationArray,
              newReservation.roomIndex, validation.startIndex)

            const newReservations = ReservationBroker.newReservationArrayState(
              reservationArray, newReservation, reservationIndex)
            storage.updateReservations({values: newReservations, suggestions: []})

            res.status(200)
            res.send(JSON.stringify({
                newReservation: newReservation,
                reservationIndex: reservationIndex,
            }))

        } else {
            res.status(404)
            res.send("No hay habitación disponible con esas características")
        }
    } else {
        res.status(400)
        res.send("Datos incorrectos.")
    }
});

function handleGuestMovementReq(req, res, guestIn){
    let currentStatus = ReservationStatus.checkedIn
    let newStatus = ReservationStatus.checkedOut
    if(guestIn){
        currentStatus = ReservationStatus.waiting
        newStatus = ReservationStatus.checkedIn
    }

    const indexes = req.body.indexes
    const reservations = storage.getReservations()
    if(ReservationBroker.assertReservationsWithStatus(reservations.values, indexes,
      currentStatus)){
        const newArray = ReservationBroker.updateReservationStatus(reservations.values,
          indexes, newStatus)
        storage.updateReservations({values: newArray, suggestions: []})
        res.status(200)
        res.send("OK")
    } else {
        res.status(400)
        res.send("Datos incorrectos.")
    }
}

app.post('/api/reservation/in', auth.loginRedirect, function (req, res) {
    handleGuestMovementReq(req, res, true)
});

app.post('/api/reservation/out', auth.loginRedirect, function (req, res) {
    handleGuestMovementReq(req, res, false)
});

const models = require("../app/models");

const usuarios = require('../app/controllers/api/usuarios');
const habitaciones = require('../app/controllers/api/habitaciones');
const tipos_habitacion = require('../app/controllers/api/tipos_habitacion');
const clientes = require('../app/controllers/api/clientes');

app.use('/api/usuarios',usuarios);
app.use('/api/habitaciones', habitaciones);
app.use('/api/tipos_habitacion',tipos_habitacion);
app.use('/api/clientes', clientes);

models.sequelize.sync(/*{force:true}*/).then(function () {
    "use strict"
    app.listen(port, function () {
        console.log('Application listening on  port ' + port);
    });
});
