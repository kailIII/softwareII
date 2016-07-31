import SpreadsheetStatus from '../../../constants/SpreadsheetStatus.js'

const defaultNewReservation = {
    roomIndex: -1,
    startIndex: -1,
    endIndex: -1,
}
const defaultDisplayInfo = {
    roomIndex: -1,
    dayIndex: -1,
    clientName: '',
    startDate: new Date(),
    endDate: new Date(),
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
            },
            displayInfo: { ...defaultDisplayInfo },

        }
        break;
    case 'ESCOGER_INTERVALO':
        return {
            ...state,
            status : SpreadsheetStatus.selectCliente,
            newReservation: {
                ...(state.newReservation),
                endIndex: action.endIndex,
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
            roomInfo: {
                roomIndex: action.roomIndex,
                dayIndex: action.dayIndex,
                clientName: action.clientName,
                startDate: action.startDate,
                endDate: action.endDate,
            },
            newReservation:  { ...defaultNewReservation },
            status: SpreadsheetStatus.displayInfo,
        }
    case 'CANCEL_DISPLAY_INFO':
        return {
            ...state,
            roomInfo:  { ...defaultDisplayInfo },
            status: SpreadsheetStatus.normal,
        }
    }
    return state;
}

export default spreadsheet;
