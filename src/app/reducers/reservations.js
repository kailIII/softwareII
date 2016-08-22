import RoomTypes from '../../../constants/RoomTypes'
import ReservationStatus from '../../../constants/ReservationStatus'
import ReservationBroker from '../../app/components/pages/spreadsheet/ReservationBroker'

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

function updateReservationStatus(values, indexes, newStatus){
    if(indexes.length === 1){
        const index = indexes[0]
        const checkedInReservation = {...values[index], status: newStatus}
        const newState = [
            ...values.slice(0, index),
            checkedInReservation,
            ...values.slice(index + 1),
        ]
        return newState
    } else {
        const newState = [ ...values ]
        for(let i = 0; i < indexes.length; i++){
            newState[indexes[i]].status = newStatus
        }
        return newState
    }
}

function getSubsetOfReservations(values, predicate){
    const result = []
    for(let i = 0; i < values.length; i++){
        const reservation = { ...values[i] }
        if(predicate(reservation)){
            reservation.reservationIndex = i
            result.push(reservation)
        }
    }
    return result
}

/**
* Obitiene todas las reservaciones con status checkedIn que terminan amtes del dia
* actual.
* @param values array con objetos de reservacion del state.
* @param todayIndex indice en el spreadsheet del dia actual
* @return un array con todas las reservaciones con status checkedIn que terminan
* antes del dia actual. Adicionalmente el objeto reservacion tiene un attributo
* reservationIndex con el indice de la reservacion en el array del store.
*/
function getOccupiedReservations(values, todayIndex){
    return getSubsetOfReservations(values,
      (reservation) => { return reservation.status === ReservationStatus.checkedIn
          && reservation.startIndex + reservation.totalDays <= todayIndex})
}
/**
* Obitiene todas las reservaciones con status waiting que comienzan en el dia
* actual.
* @param values array con objetos de reservacion del state.
* @param todayIndex indice en el spreadsheet del dia actual
* @return un array con todas las reservaciones con status waiting que comienzan
* en el dia. Adicionalmente el objeto reservacion tiene un attributo
* reservationIndex con el indice de la reservacion en el array del store.
*/
function getWaitingReservations(values, todayIndex){
    return getSubsetOfReservations(values,
      (reservation) => {return reservation.status === ReservationStatus.waiting
          && reservation.startIndex === todayIndex})
}

function reservations (state = {}, action) {
    switch(action.type){
    case 'NEW_RESERVATION':{
        const newReservation = action.newReservation

        const newArray = ReservationBroker.newReservationArrayState(state.values,
          newReservation, action.position)
        return {values: newArray, suggestions: []}
    }
    case 'NEW_CHECK_IN':{
        return { values: state.values,
          suggestions: getWaitingReservations(state.values, action.todayIndex)}
    }
    case 'NEW_CHECK_OUT':{
        const newStatus = { values: state.values,
          suggestions: getOccupiedReservations(state.values, action.todayIndex)}
        return newStatus
    }
    case 'CHECK_IN':{
        const indexes = action.reservationIndexes
        return { values: updateReservationStatus(state.values, indexes,
          ReservationStatus.checkedIn),
          suggestions: [],
        }
    }
    case 'CANCEL_CHECK_IN_OUT': {
        return {
            values: state.values,
            suggestions: [],
        }
    }
    case 'CHECK_OUT':{
        const indexes = action.reservationIndexes
        return { values: updateReservationStatus(state.values, indexes,
          ReservationStatus.checkedOut),
          suggestions: [],
        }
    }
    }

    return state;
}

export default reservations;
