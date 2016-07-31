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
function reservations (state = [], action) {
    switch(action.type){
    case 'NEW_RESERVATION':
        const newReservation = action.newReservation
        newReservation.status = ReservationStatus.waiting
        const newPosition = getLastIndexOfRoom(state, newReservation.roomIndex,
          newReservation.startIndex)

        if(newPosition === 0)
            return [newReservation, ...state]
        if(newPosition >= state.length)
            return [ ...state, newReservation]
        const newState = [
            ...state.slice(0, newPosition),
            newReservation,
            ...state.slice(newPosition),
        ]
        return newState
    }

    return state;
}

export default reservations;
