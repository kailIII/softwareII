function spreadsheet (state = [], action) {
  console.log("reducer spreadsheet");
  switch(action.type){
    case 'ESCOGER_HABITACION':
      return {
        ...state,
        isSelectingDate : true,
        selection : {
          roomIndex: action.roomIndex,
          dayIndex: action.dayIndex,
        }

      }
  }
  return state;
}

export default spreadsheet;
