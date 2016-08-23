'use strict';
const roomTypes = require('../../../data/roomTypes.js')
const SpreadsheetDates = require('./SpreadsheetDates.js')
const ReservationStatus = require('./../../../../../constants/ReservationStatus.js')

/**
* Encuentra la dispinibilidad de una habitacion
* @param reservations la lista de reservatciones
* @param requestedType el tipo de reservacion deseada. Tiene que ser un RoomTypes
* @param startIndex indice de la fecha de inicio de la reservacion (primera noche)
* @param endIndex indicie de la fecha final de la reservacion (ultima noche)
* @param reservIndex indice de la reservacion donde comienza la busqueda. en cada
* llamada a esta funcion no itera desde el incio de reservations sino que desde este
* indice. un nuevo reservIndex es parte del resultado
* @result un objeto con dos propiedades:
* isAvailable boolean que indica si la habitacion con roomIndex esta disponible en el
* interval [startIndex endIndex]
* newReservIndex el indice de la primera reservation que se deberia de buscar en
* la siguiente vez que se llame a este algoritmo
*/
function getRoomAvailability(reservations, requestedType, startIndex, endIndex, roomIndex, reservIndex){
    let i
    for(i = reservIndex; i < reservations.length && reservations[i].roomIndex <= roomIndex ; i++){
        if(reservations[i].roomIndex === roomIndex){
            const currentReservation = reservations[i]
            const currentEndIndex = currentReservation.startIndex + currentReservation.totalDays - 1
            if(currentReservation.startIndex <= startIndex && startIndex <= currentEndIndex)
                return { isAvailable: false,
                      newReservIndex: i + 1,
                    }
            if(currentReservation.starIndex <= endIndex && endIndex <= currentEndIndex)
                return { isAvailable: false,
                      newReservIndex: i + 1,
                    }
        }
    }

    return { isAvailable: true,
          newReservIndex: i,
        }
}

function findAvailableRoomIndex (rooms, reservations, requestedType, startIndex, endIndex){
    let roomIndex, reservIndex = 0
    for(roomIndex = 0; roomIndex < rooms.length; roomIndex++){
        const currentRoom = rooms[roomIndex]
        if(currentRoom.type === requestedType){
            const availabilityObj = getRoomAvailability(reservations,
              requestedType, startIndex, endIndex, roomIndex, reservIndex)
            if(availabilityObj.isAvailable)
                return roomIndex
            else
                reservIndex = availabilityObj.newReservIndex
        }
    }
    return -1
}

function findAvailableReservation(rooms, reservations, requestedType, startIndex,
    endIndex, guestName){
    const roomIndex = findAvailableRoomIndex(rooms, reservations, requestedType,
      startIndex, endIndex)
    if(roomIndex !== -1){
        return {
            roomIndex: roomIndex,
            startIndex: startIndex,
            totalDays: endIndex - startIndex + 1,
            clientName: guestName,
            status: ReservationStatus.waiting,
        }
    }
    return null
}

function validateNewReservation(desiredRoom, guestName, spreadsheet1stDate,
  startReservDate, endReservDate){
    let error = false
    let startIndex, endIndex
    const newState = {
        roomTypeError: "",
        guestNameError: "",
        startDateError: "",
        endDateError: "",
    }

    if(!desiredRoom || desiredRoom.length === 0){
        error = true
        newState.roomTypeError = "Tipo de habitación inválido"
    } else if(!roomTypes.includes(desiredRoom)){
        error = true
        newState.roomTypeError = "Tipo de habitación inválido"
    }

    if(!guestName || guestName.length < 3){
        error = true
        newState.guestNameError = "Nombre de huésped inválido"
    }

    if(!spreadsheet1stDate){
        error = true
        newState.startDateError = "Fecha de referencia inválida"
        newState.endDateError = "Fecha de referencia inválida"
    } else {
        startIndex = SpreadsheetDates.dateToIndex(spreadsheet1stDate, startReservDate)
        endIndex = SpreadsheetDates.dateToIndex(spreadsheet1stDate, endReservDate)
        if(!startReservDate || startIndex < 0 || !endReservDate || endIndex < 0){
            error = true
            if(!startReservDate){
                newState.startDateError = "Por favor ingresa la fecha inicial"
            }
            if(!endReservDate){
                newState.endDateError = "Por favor ingresa la fecha final"
            }
        } else if(endIndex < startIndex){
            error = true
            newState.endDateError = "La fecha final no puede ser anterior a la inicial"
        }
    }

    return {
        error: error,
        newState: newState,
        startIndex: startIndex,
        endIndex: endIndex,
    }
}

function newReservationArrayState(array, newReservation, newPosition){
    const newArray = [newReservation]
    if(newPosition === 0)
        return newArray.concat(array)

    if(newPosition >= array.length)
        return array.concat(newArray)

    return array.slice(0, newPosition).concat(newArray,
          array.slice(newPosition))
}

function assertReservationsWithStatus(values, indexes, status){
    for(let i = 0; i < indexes.length; i++){
        if(values[indexes[i]].status !== status)
            return false
    }
    return true
}

function updateReservationStatus(values, indexes, newStatus){
    const newState = values.slice()
    for(let i = 0; i < indexes.length; i++){
        newState[indexes[i]].status = newStatus
    }
    return newState
}

function getLastIndexOfRoom(reservations, roomIndex, startIndex){
    let i = reservations.length
    for(i -= 1; i > -1; i--){
        const currentRoomIndex = reservations[i].roomIndex
        if(currentRoomIndex < roomIndex)
            return i + 1
        if(currentRoomIndex === roomIndex){
            const currentStartIndex = reservations[i].startIndex
            if(currentStartIndex < startIndex)
                return i + 1
        }
    }

    return 0
}
/**
* busca todas las reservaciones para el dia actual para un huesped en especifico
* @param lista de todas las reservaciones que comienzan en el dia actual. Los
* objetos en esta lista deben de tener un attributo reservationIndex, con el indice
* de la reservacion en el arreglo de reservaciones del state, y un attributo
* clientName, con el nombre del cliente que tiene esa reservacion
* @param guestName el nombre del huespued cuyas reservaciones se buscaran
* @return un arreglo de enteros. cada uno es un indice valido en el arreglo de
* reservaciones del state a nombre de guestName
*/
function findTodaysReservationsOfGuest(suggestions, guestName){
    const reservs = []
    for(let i = 0; i < suggestions.length; i++){
        if(suggestions[i].clientName === guestName)
            reservs.push(suggestions[i].reservationIndex)
    }
    return reservs
}

module.exports = {
    findAvailableReservation: findAvailableReservation,

    findTodaysReservationsOfGuest: findTodaysReservationsOfGuest,

    validateNewReservation: validateNewReservation,

    getLastIndexOfRoom: getLastIndexOfRoom,

    newReservationArrayState: newReservationArrayState,

    updateReservationStatus: updateReservationStatus,

    assertReservationsWithStatus: assertReservationsWithStatus,
}
