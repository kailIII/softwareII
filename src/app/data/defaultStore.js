const rooms = require('./rooms.js')
const guests = require('./guests.js')
const reservations = require('./reservations.js')

const SpreadsheetStatus = require('../../../constants/SpreadsheetStatus.js')
const today = new Date()

module.exports = {
    rooms: rooms,
    guests: guests,
    reservations: {
        values: reservations,
        suggestions: [],
    },
    spreadsheet: {
        snackMessage: '',
        status: SpreadsheetStatus.normal,
        firstDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
        totalDays: 12,
    },

};
