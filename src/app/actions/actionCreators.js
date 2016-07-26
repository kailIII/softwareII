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

export function displayInfo(roomIndex, dayIndex, clientName, startDate, endDate) {
    return  {
        type: 'DISPLAY_INFO',
        roomIndex: roomIndex,
        dayIndex: dayIndex,
        clientName: clientName,
        startDate: startDate,
        endDate: endDate,
    }
}

export function cancelarDisplayInfo() {
    return  {
        type: 'CANCEL_DISPLAY_INFO',
    }
}
