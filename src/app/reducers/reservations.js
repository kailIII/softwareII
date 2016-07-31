import RoomTypes from '../../../constants/RoomTypes'
import ReservationStatus from '../../../constants/ReservationStatus'

function getLastIndexOfRoom(reservations, roomIndex){
    const len = reservations.length
    for(let i = len - i; i > -1; i--){
        if(reservations[i].roomIndex <= roomIndex)
            return i + 1
    }

    return 0
}
function reservations (state = [], action) {
    switch(action.type){
    case 'NEW_RESERVATION':
        const newReservation = action.newReservation
        newReservation.status = ReservationStatus.waiting
        const newPosition = getLastIndexOfRoom(state, newReservation.roomIndex)
        return [
            ...state.slice(0, newPosition),
            newReservation,
            ...state.slice(newPosition + 1),
        ]
    }

    return state;
}

export default reservations;
