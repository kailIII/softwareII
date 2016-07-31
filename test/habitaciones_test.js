const chai = require("chai")
chai.config.includeStack = true;
const expect = chai.expect;
const assert = chai.expect;
const actionCreators = require("../src/app/actions/actionCreators")

import rooms from '../src/app/data/rooms';
import guests from '../src/app/data/guests';

import spreadsheet from '../src/app/reducers/spreadsheet'
import roomsReducer from '../src/app/reducers/rooms'
import SpreadsheetStatus from '../constants/SpreadsheetStatus'
import RoomTypes from '../constants/RoomTypes'

const state = {
    rooms: rooms,
    guests: guests,

    spreadsheet: {
        newReservation:  {
            roomIndex: -1,
            startIndex: -1,
            endIndex: -1,
        },
        status: SpreadsheetStatus.normal,
        firstDate: new Date(),
        totalDays: 7,
    },

};

describe("Proceso de reservacion de habitacion", function () {
    const selectedRoom = 2;
    const selectedStartDay = 4;
    const selectedEndDay = 5;

    it("Escoger habitacion",function () {
        const rooms = state.rooms
        const escogerHabitacionAction = actionCreators.escogerHabitacion(selectedRoom,
      selectedStartDay)
        const newSpreadsheet = spreadsheet(state.spreadsheet, escogerHabitacionAction)
        expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
        state.spreadsheet = newSpreadsheet

    })


    it("Escoger fin reservacion",function () {
        const escogerIntervaloAction = actionCreators.escogerIntervalo(selectedEndDay)
        const newSpreadsheet = spreadsheet(state.spreadsheet, escogerIntervaloAction)
        expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
        state.spreadsheet = newSpreadsheet

    })

    it("Cancelar nueva reservacion",function () {
        const cancelarAction = actionCreators.cancelarNuevaReservacion()
        const newSpreadsheet = spreadsheet(state.spreadsheet, cancelarAction)
        const newReservation = newSpreadsheet.newReservation
        expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
        expect(newReservation.startIndex).to.be.equal(-1)
        expect(newReservation.endIndex).to.be.equal(-1)
        expect(newReservation.roomIndex).to.be.equal(-1)

    })


    it("Guardar nueva reservacion",function () {
        const newReservation = {
            roomIndex: selectedRoom,
            startIndex: selectedStartDay,
            endIndex: selectedEndDay,
        }
        const reservarAction = actionCreators.reservarHabitacion(newReservation)
        const newSpreadsheet = spreadsheet(state.spreadsheet, reservarAction)
        const newRooms = roomsReducer(state.rooms, reservarAction)
        const newReservationResult = newSpreadsheet.newReservation
        expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
        expect(newRooms).to.be.not.equal(state.rooms)

        state.rooms = newRooms
        expect(state.rooms[selectedRoom].days[selectedStartDay]).
        to.be.equal(RoomTypes.reservado)
        expect(state.rooms[selectedRoom].days[selectedEndDay]).
        to.be.equal(RoomTypes.reservado)

        expect(newReservationResult.startIndex).to.be.equal(-1)
        expect(newReservationResult.endIndex).to.be.equal(-1)
        expect(newReservationResult.roomIndex).to.be.equal(-1)
    })

    it("Mostrar la nueva reservacion", function(){
        let startDate = new Date()
        startDate.setDate(startDate.getDate + selectedStartDay)
        let endDate = new Date()
        endDate.setDate(endDate.getDate + selectedEndDay)
        const displayAction = actionCreators.displayInfo(selectedRoom, selectedEndDay,
        'Michael Galarza', startDate, endDate)
        const newSpreadsheet = spreadsheet(state.spreadsheet, displayAction)

        expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
        expect(newSpreadsheet.status).to.be.equal(SpreadsheetStatus.displayInfo)
        expect(newSpreadsheet.roomInfo.roomIndex).to.be.equal(selectedRoom)
    })
});
