export function escogerHabitacion(roomIndex, dayIndex) {
  console.log("escogerHabitacion", dayIndex);
    return  {
        type: 'ESCOGER_HABITACION',
        roomIndex: roomIndex,
        dayIndex: dayIndex,
    }
}
