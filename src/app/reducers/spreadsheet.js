import SpreadsheetStatus from '../../../constants/SpreadsheetStatus.js'

const defaultNewReservation = {
    roomIndex: -1,
    startIndex: -1,
    totalDays: -1,
    clientName: '',
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
                totalDays: -1,
                clientName: '',
            },

        }
        break;
    case 'ESCOGER_INTERVALO':
        return {
            ...state,
            status : SpreadsheetStatus.selectCliente,
            newReservation: {
                ...(state.newReservation),
                totalDays: action.totalDays,
            },
          }
        break;
    case 'CANCEL_NEW_RESERVATION':
    case 'NEW_RESERVATION':
        return {
            ...state,
            newReservation:  { ...defaultNewReservation },
            status: SpreadsheetStatus.normal,
        }
    case 'DISPLAY_INFO':
        return {
            ...state,
            displayReservationIndex: action.reservationIndex,
            newReservation:  { ...defaultNewReservation },
            status: SpreadsheetStatus.displayInfo,
        }
    case 'CANCEL_DISPLAY_INFO':
        return {
            ...state,
            status: SpreadsheetStatus.normal,
        }
    }
    return state;
}

export default spreadsheet;
