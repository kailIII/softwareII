import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/actionCreators.js'

import roomTable from './RoomTable.js';

function mapStateToProps(state) {
    console.log(state.spreadsheet.firstDate)
    return {
        rooms: state.rooms,
        reservations: state.reservations,
        latestReservation: state.spreadsheet.latestReservation,
        displayReservationIndex: state.spreadsheet.displayReservationIndex,
        status: state.spreadsheet.status,
        firstDate: state.spreadsheet.firstDate,
        totalDays: state.spreadsheet.totalDays,
        snackMessage: state.spreadsheet.snackMessage,
        initialMarginY: 2 * (64 + 8), //AppBar default height
        indexToDate: function(i){
            return new Date(state.spreadsheet.firstDate.getFullYear(),
                        state.spreadsheet.firstDate.getMonth(),
                        state.spreadsheet.firstDate.getDate() + i)
        },
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const controller = connect(mapStateToProps, mapDispatchToProps)(roomTable);

export default controller;
