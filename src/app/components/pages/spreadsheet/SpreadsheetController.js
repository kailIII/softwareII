import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/actionCreators.js'

import roomTable from './RoomTable.js';

function mapStateToProps(state) {
    return {
        rooms: state.rooms,
        newReservation: state.spreadsheet.newReservation,
        status: state.spreadsheet.status,
        firstDate: state.spreadsheet.firstDate,
        totalDays: state.spreadsheet.totalDays,
        indexToDate: function(i){
          return new Date(state.spreadsheet.firstDate.getYear(),
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
