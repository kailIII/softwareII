import SpreadsheetStatus from '../../../constants/SpreadsheetStatus.js'
import SpreadsheetDates from '../components/pages/spreadsheet/SpreadsheetDates'


function spreadsheet (state = [], action) {
    switch(action.type){
    case 'CREATE_NEW_RESERVATION':
        return {
            ...state,
            snackMessage: '',
            status: SpreadsheetStatus.reservationDialog,
        }
    case 'CANCEL_NEW_RESERVATION':
        return {
            ...state,
            snackMessage: '',
            status: SpreadsheetStatus.normal,
        }
    case 'NEW_RESERVATION':
        const newReservation = action.newReservation
        return {
            ...state,
            snackMessage: `Habitación #${action.roomId} reservada para el ` +
            `${action.firstDate} por ` +
            `${newReservation.totalDays} días para ${newReservation.clientName}`,
            status: SpreadsheetStatus.normal,
        }
    case 'NEW_CHECK_IN':
        return {
            ...state,
            snackMessage: '',
            status: SpreadsheetStatus.checkInDialog,
        }
    case 'NEW_CHECK_OUT':
        return {
            ...state,
            snackMessage: '',
            status: SpreadsheetStatus.checkOutDialog,
        }
    case 'CANCEL_CHECK_IN_OUT':
        return {
            ...state,
            snackMessage: '',
            status: SpreadsheetStatus.normal,
        }
    case 'CHECK_IN':
    case 'CHECK_OUT':
        return {
            ...state,
            snackMessage: action.snackMessage,
            status: SpreadsheetStatus.normal,
        }
    case 'DISPLAY_INFO':
        return {
            ...state,
            displayReservationIndex: action.reservationIndex,
            snackMessage: '',
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
