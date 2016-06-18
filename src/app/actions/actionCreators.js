export function escogerHabitacion(roomIndex, startIndex) {
    return  {
        type: 'ESCOGER_HABITACION',
        roomIndex: roomIndex,
        startIndex: startIndex,
    }
}

export function escogerIntervalo(endIndex) {
  console.log("Escoger intervalo")
    return  {
        type: 'ESCOGER_INTERVALO',
        endIndex: endIndex,
    }
}
