import SpreadsheetStatus from '../../../constants/SpreadsheetStatus.js'

const defaultNewReservation = {
    roomIndex: -1,
    roomNumber: 0,
    startIndex: -1,
    totalDays: -1,
    clientName: '',
}


function spreadsheet (state = [], action) {
    switch(action.type){
    case 'CREATE_NEW_RESERVATION':
        return {
            ...state,
            latestReservation:  { ...defaultNewReservation },
            status: SpreadsheetStatus.reservationDialog,
        }
    case 'CANCEL_NEW_RESERVATION':
        return {
            ...state,
            latestReservation:  { ...defaultNewReservation },
            status: SpreadsheetStatus.normal,
        }
    case 'NEW_RESERVATION':
        return {
            ...state,
            latestReservation:  { ...action.newReservation, roomId: action.roomId },
            status: SpreadsheetStatus.normal,
        }
    case 'NEW_CHECK_IN':
        return {
            ...state,
            latestReservation:  { ...defaultNewReservation },
            status: SpreadsheetStatus.checkInDialog,
        }
    case 'NEW_CHECK_OUT':
        return {
            ...state,
            latestReservation:  { ...defaultNewReservation },
            status: SpreadsheetStatus.checkOutDialog,
        }
    case 'CANCEL_CHECK_IN_OUT':
    case 'CHECK_IN':
        return {
            ...state,
            latestReservation:  { ...defaultNewReservation },
            status: SpreadsheetStatus.normal,
        }
    case 'DISPLAY_INFO':
        return {
            ...state,
            displayReservationIndex: action.reservationIndex,
            latestReservation:  { ...defaultNewReservation },
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
