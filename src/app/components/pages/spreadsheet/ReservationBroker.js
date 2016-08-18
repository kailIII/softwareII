'use strict';
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
    findAvailableRoom: function (rooms, reservations, requestedType, startIndex, endIndex){
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
    },

    findTodaysReservationsOfGuest: findTodaysReservationsOfGuest,
}
