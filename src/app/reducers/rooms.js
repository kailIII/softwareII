import RoomTypes from '../../../constants/RoomTypes'

function rooms (state = [], action) {
    switch(action.type){
        case 'NEW_RESERVATION':
            const newReservation = action.newReservation
            const roomIndex = newReservation.roomIndex
            const reservedRoom = state[roomIndex]
            const reservedRoomDays = reservedRoom.days
            const reservedDays = newReservation.endIndex - newReservation.startIndex + 1
            const newDays = new Array(reservedDays )
            let i = 0
            for(i=0; i < reservedDays; i++) newDays[i] = RoomTypes.reservado

            return [
                ...state.slice(0, roomIndex),
                { ...reservedRoom,
                  days: [ ...reservedRoomDays.slice(0, newReservation.startIndex),
                          ...newDays,
                          ...reservedRoomDays.slice(newReservation.endIndex + 1),
                  ],
                },
                ...state.slice(roomIndex + 1),
            ]
    }
    return state;
}

export default rooms;
