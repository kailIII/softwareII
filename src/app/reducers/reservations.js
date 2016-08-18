import RoomTypes from '../../../constants/RoomTypes'
import ReservationStatus from '../../../constants/ReservationStatus'

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

function getWaitingReservations(values, todayIndex){
    const result = []
    for(let i = 0; i < values.length; i++){
        const reservation = { ...values[i] }
        if(reservation.status === ReservationStatus.waiting
          && reservation.startIndex === todayIndex){
            reservation.reservationIndex = i
            result.push(reservation)
        }
    }
    return result
}

function reservations (state = {}, action) {
    switch(action.type){
    case 'NEW_RESERVATION':{
        const newReservation = action.newReservation
        newReservation.status = ReservationStatus.waiting
        const newPosition = getLastIndexOfRoom(state.values, newReservation.roomIndex,
          newReservation.startIndex)

        if(newPosition === 0)
            return { values: [newReservation, ...state.values],
              suggestions: [],
            }

        if(newPosition >= state.length)
            return { values: [ ...state.values, newReservation],
              suggestions: [] }
        return { values: [
            ...state.values.slice(0, newPosition),
            newReservation,
            ...state.values.slice(newPosition),
        ],
        suggestions: [],
      }
    }
    case 'NEW_CHECK_IN':{
        return { values: state.values,
          suggestions: getWaitingReservations(state.values, action.todayIndex)}
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
        const newPosition = action.reservationIndexes
        return { values: updateReservationStatus(state.values, indexes,
          ReservationStatus.checkedOut),
          suggestions: [],
        }
    }
    }

    return state;
}

export default reservations;
