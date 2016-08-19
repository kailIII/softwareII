const storage = require('node-persist');
const defaultStore = require('../src/app/data/defaultStore.js');
//init storage
storage.initSync({
    dir: __dirname + "/persistedState",
    interval: 30000,
})

const RESERVATIONS_KEY = "RESERVATIONSSTATE"
const SPREADSHEET_KEY = "SPREADSHEETSTATE"
const ROOMS_KEY = "ROOMSSTATE"
let initialReservations = storage.getItem(RESERVATIONS_KEY) || defaultStore.reservations
let initialSpreadsheet = storage.getItem(SPREADSHEET_KEY) || defaultStore.spreadsheet
let initialRooms = storage.getItem(ROOMS_KEY) || defaultStore.rooms

module.exports = {
    getReservations: function(){
        return initialReservations
    },
    getSpreadsheet: function(){
        return initialSpreadsheet
    },
    getRooms: function(){
        return initialRooms
    },

    updateReservations: function(newReservations){
        storage.setItem(RESERVATIONS_KEY, newReservations)
        initialReservations = newReservations
    },
    updateSpreadsheet: function(newSpreadsheet){
        storage.setItem(RESERVATIONS_KEY, newSpreadsheet)
        initialSpreadsheet = newSpreadsheet
    },
    updateRooms: function(newRooms){
        storage.setItem(ROOMS_KEY, newRooms)
        initialRooms = newRooms
    },

}
