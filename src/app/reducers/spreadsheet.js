import SpreadsheetStatus from '../../../constants/SpreadsheetStatus.js'
function spreadsheet (state = [], action) {
  switch(action.type){
    case 'ESCOGER_HABITACION':
      return {
        ...state,
        status : SpreadsheetStatus.selectFecha,
        newReservation : {
          roomIndex: action.roomIndex,
          startIndex: action.startIndex,
          emdIndex: -1,
        }

      }
      break;
    case 'ESCOGER_INTERVALO':
      return {
        ...state,
        status : SpreadsheetStatus.selectCliente,
        newReservation: {
          ...(state.newReservation),
          endIndex: action.endIndex,
        }

      }
  }
  return state;
}

export default spreadsheet;
