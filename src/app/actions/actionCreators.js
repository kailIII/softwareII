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

export function reservarHabitacion(newReservation, clientName) {
    return  {
        type: 'NEW_RESERVATION',
        newReservation: newReservation,
        clientName: clientName,
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
