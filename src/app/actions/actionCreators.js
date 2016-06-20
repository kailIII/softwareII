export function escogerHabitacion(roomIndex, startIndex) {
    return  {
        type: 'ESCOGER_HABITACION',
        roomIndex: roomIndex,
        startIndex: startIndex,
    }
}

export function escogerIntervalo(endIndex) {
    return  {
        type: 'ESCOGER_INTERVALO',
        endIndex: endIndex,
    }
}

export function cancelarNuevaReservacion() {
    return  {
        type: 'CANCEL_NEW_RESERVATION',
    }
}

export function reservarHabitacion(newReservation) {
    return  {
        type: 'NEW_RESERVATION',
        newReservation: newReservation,
    }
}
