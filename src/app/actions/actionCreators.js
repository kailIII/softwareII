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

export function checkIn(reservationIndex) {
    return  {
        type: 'CHECK_IN',
        reservationIndex: reservationIndex,
    }
}

export function checkOut(reservationIndex) {
    return  {
        type: 'CHECK_OUT',
        reservationIndex: reservationIndex,
    }
}

export function undoCheckIn(reservationIndex) {
    return  {
        type: 'UNDO_CHECK_IN',
        reservationIndex: reservationIndex,
    }
}

export function undoCheckOut(reservationIndex) {
    return  {
        type: 'UNDO_CHECK_OUT',
        reservationIndex: reservationIndex,
    }
}
