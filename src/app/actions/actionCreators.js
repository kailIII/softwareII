export function escogerHabitacion(roomId, day) {
    return  {
        type: 'ESCOGER_HABITACION',
        roomId: roomId,
        day: day,
    }
}
