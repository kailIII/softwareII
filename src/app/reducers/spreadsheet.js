import SpreadsheetStatus from '../../../constants/SpreadsheetStatus.js'

const defaultNewReservation = {
  roomIndex: -1,
  startIndex: -1,
  endIndex: -1,
}

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
      break;
    case 'CANCEL_NEW_RESERVATION':
      case 'NEW_RESERVATION':
      return {
        ...state,
        newReservation:  { ...defaultNewReservation },
        status: SpreadsheetStatus.normal,
      }
      break;
  }
  return state;
}

export default spreadsheet;
