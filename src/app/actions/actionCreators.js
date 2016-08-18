export function escogerHabitacion(roomIndex, startIndex) {
    return  {
        type: 'ESCOGER_HABITACION',
        roomIndex: roomIndex,
        startIndex: startIndex,
    }
}

export function escogerIntervalo(totalDays) {
    return  {
        type: 'ESCOGER_INTERVALO',
        totalDays: totalDays,
    }
}

export function cancelarNuevaReservacion() {
    return  {
        type: 'CANCEL_NEW_RESERVATION',
    }
}

export function crearNuevaReservacion() {
    return  {
        type: 'CREATE_NEW_RESERVATION',
    }
}

export function reservarHabitacion(newReservation, roomId) {
    return  {
        type: 'NEW_RESERVATION',
        newReservation: newReservation,
        roomId: roomId,
    }
}

export function displayInfo(reservationIndex) {
    return  {
        type: 'DISPLAY_INFO',
        reservationIndex: reservationIndex,
    }
}

export function cancelarDisplayInfo() {
    return  {
        type: 'CANCEL_DISPLAY_INFO',
    }
}

export function newCheckOut() {
    return  {
        type: 'NEW_CHECK_OUT',
    }
}

export function newCheckIn(todayIndex) {
    return  {
        type: 'NEW_CHECK_IN',
        todayIndex: todayIndex,
    }
}

export function checkIn(reservationIndexes) {
    return  {
        type: 'CHECK_IN',
        reservationIndexes: reservationIndexes,
    }
}

export function checkOut(reservationIndexes) {
    return  {
        type: 'CHECK_OUT',
        reservationIndexes: reservationIndexes,
    }
}

export function cancelCheckInOut() {
    return  {
        type: 'CANCEL_CHECK_IN_OUT',
    }
}
