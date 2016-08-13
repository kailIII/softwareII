function getRoomAvailability(reservations, requestedType, startIndex, endIndex, roomIndex, reservIndex){
    let i
    for(i = reservIndex; i < reservations.length && reservations[i].roomIndex <= roomIndex ; i++){
        if(i === roomIndex){
            const currentReservation = reservations[i]
            const currentEndIndex = currentReservation.startIndex + currentReservation.totalDays - 1
            if(currentReservation.starIndex < startIndex && startIndex < currentEndIndex)
                return { isAvailable: false,
                      newReservIndex: i + 1,
                    }
            if(currentReservation.starIndex < endIndex && endIndex < currentEndIndex)
                return { isAvailable: false,
                      newReservIndex: i + 1,
                    }
        }
    }

    return { isAvailable: true,
          newReservIndex: i,
        }
}

module.exports = {
    findAvailableRoom: function (rooms, reservations, requestedType, startIndex, endIndex){
        console.log(`find available room: ${rooms.length} ${reservations.length}, ${requestedType} ${startIndex} ${endIndex}`)
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
}
