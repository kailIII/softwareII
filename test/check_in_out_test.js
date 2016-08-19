const chai = require("chai")
chai.config.includeStack = true;
const expect = chai.expect;
const actionCreators = require("../src/app/actions/actionCreators")

import rooms from '../src/app/data/rooms';
import guests from '../src/app/data/guests';
import reservations from '../src/app/data/reservations';

import spreadsheet from '../src/app/reducers/spreadsheet'
import reservationsReducer from '../src/app/reducers/reservations'
import SpreadsheetStatus from '../constants/SpreadsheetStatus'
import ReservationStatus from '../constants/ReservationStatus'
import ReservationBroker from '../src/app/components/pages/spreadsheet/ReservationBroker'
import RoomTypes from '../constants/RoomTypes'

const state = require('../src/app/data/defaultStore.js')

const todayIndex = 3
let action = actionCreators.newCheckIn(todayIndex)
describe('Check-In: ', function() {
    it("Abrir el dialog para hacer Check-In", function() {
        const newSpreadsheet = spreadsheet(state.spreadsheet, action)
        expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
        expect(newSpreadsheet.status).to.be.equal(SpreadsheetStatus.checkInDialog)
        expect(newSpreadsheet.snackMessage).to.be.empty
    })

    it("colocar sugerencias en el dialog", function() {
        const newReservations = reservationsReducer(state.reservations, action)
        expect(newReservations).to.be.not.equal(state.reservations)
        expect(newReservations.suggestions).to.have.lengthOf(1)
    })
})

describe('Check-Out: ', function() {
    it("Abrir el dialog para hacer Check-Out", function() {
        action = actionCreators.newCheckOut(todayIndex)
        const newSpreadsheet = spreadsheet(state.spreadsheet, action)
        expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
        expect(newSpreadsheet.status).to.be.equal(SpreadsheetStatus.checkOutDialog)
        expect(newSpreadsheet.snackMessage).to.be.empty
    })

    it("Colocar sugerencias en el dialog", function() {
        const newReservations = reservationsReducer(state.reservations, action)
        expect(newReservations).to.be.not.equal(state.reservations)
        expect(newReservations.suggestions).to.have.lengthOf(2)
    })
})
