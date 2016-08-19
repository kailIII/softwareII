const chai = require("chai")
chai.config.includeStack = true;
const expect = chai.expect;
const assert = chai.expect;
const actionCreators = require("../src/app/actions/actionCreators")

import rooms from '../src/app/data/rooms';
import guests from '../src/app/data/guests';
import reservations from '../src/app/data/reservations';

import spreadsheet from '../src/app/reducers/spreadsheet'
import roomsReducer from '../src/app/reducers/rooms'
import reservationsReducer from '../src/app/reducers/reservations'
import SpreadsheetStatus from '../constants/SpreadsheetStatus'
import ReservationStatus from '../constants/ReservationStatus'
import ReservationBroker from '../src/app/components/pages/spreadsheet/ReservationBroker'
import RoomTypes from '../constants/RoomTypes'

const today = new Date()
const state = {
    rooms: rooms,
    guests: guests,
    reservations: {
        values: reservations,
        suggestions: [],
    },
    spreadsheet: {
        snackMessage:  '',
        status: SpreadsheetStatus.normal,
        firstDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
        totalDays: 12,
    },

};

describe("Proceso de reservacion de habitacion", function () {

    it("Abrir dialog para nueva reservacion",function () {
        const newDialogAction = actionCreators.crearNuevaReservacion()
        const newSpreadsheet = spreadsheet(state.spreadsheet, newDialogAction)
        expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
        expect(newSpreadsheet.status).to.be.equal(SpreadsheetStatus.reservationDialog)
        state.spreadsheet = newSpreadsheet

    })

    describe("Reservar habitacion sencilla y luego hacer check in",function () {
        const newReservation = {
            roomIndex: 0,
            startIndex: 3,
            totalDays: 3,
            clientName: "Maria Jose Riera",
        }

        const newReservationAction = actionCreators.reservarHabitacion(newReservation, 1)
        it("spreadsheet cambia a status normal", function() {
            const newSpreadsheet = spreadsheet(state.spreadsheet, newReservationAction)
            expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
            expect(newSpreadsheet.status).to.be.equal(SpreadsheetStatus.normal)
            state.spreadsheet = newSpreadsheet
        })
        it(" snackbar message muestra informacion de la reservacion realizada",
          function() {
              expect(state.spreadsheet.snackMessage).to.have.string(newReservation.clientName)
              expect(state.spreadsheet.snackMessage).to.have.string(newReservationAction.roomId)
              expect(state.spreadsheet.snackMessage).to.have.string(newReservationAction.totalDays)
          })

        it("La nueva reservacion se agrego a la lista del state en la posicion 1",
          function() {
              const newReservations = reservationsReducer(state.reservations, newReservationAction)
              expect(newReservations).to.be.not.equal(state.reservations)
              expect(newReservations.suggestions.length).to.be.equal(0)
              const reservationsArray = newReservations.values
              const expectedReservation = reservationsArray[1]
              expect(expectedReservation.clientName).to.be.equal(newReservation.clientName)
              expect(expectedReservation.startIndex).to.be.equal(newReservation.startIndex)
              expect(expectedReservation.totalDays).to.be.equal(newReservation.totalDays)
              expect(expectedReservation.roomIndex).to.be.equal(newReservation.roomIndex)
              state.reservations = newReservations
          })

        const newCheckInDialogAction = actionCreators.newCheckIn(3)
        it("Abrir el dialog para hacer CheckIn", function() {
            const newSpreadsheet = spreadsheet(state.spreadsheet, newCheckInDialogAction)
            expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
            expect(newSpreadsheet.status).to.be.equal(SpreadsheetStatus.checkInDialog)


        })

        it("Hacer CheckIn con el nombre de la persona de la ultima reservacion", function(){
            let newReservations = reservationsReducer(state.reservations, newCheckInDialogAction)
            expect(newReservations).to.be.not.equal(state.reservations)
            expect(newReservations.suggestions.length).to.be.equal(2)
            state.reservations = newReservations

            const reservationIndexes = ReservationBroker.
            findTodaysReservationsOfGuest(state.reservations.suggestions, newReservation.clientName)
            const checkInAction = actionCreators.checkIn(reservationIndexes)
            const newSpreadsheet = spreadsheet(state.spreadsheet, checkInAction)
            expect(newSpreadsheet).to.be.not.equal(state.spreadsheet)
            expect(newSpreadsheet.status).to.be.equal(SpreadsheetStatus.normal)
            state.spreadsheet = newSpreadsheet

            newReservations = reservationsReducer(state.reservations, checkInAction)
            expect(newReservations).to.be.not.equal(state.reservations)
            expect(newReservations.suggestions.length).to.be.equal(0)
            const reservationsArray = newReservations.values
            let reservation = reservationsArray[1] //la nueva reservacion se pone en uno
            expect(reservation.status).to.be.equal(ReservationStatus.checkedIn)
            expect(reservation.clientName).to.be.equal(newReservation.clientName)
            reservation = reservationsArray[4] //la reservaciones estaba en un 3, pero con la nueva suma 4
            expect(reservation.status).to.be.equal(ReservationStatus.checkedIn)
            expect(reservation.clientName).to.be.equal(newReservation.clientName)
            state.reservations = newReservations
        })



    })

/*
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
    */
});
