import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/actionCreators.js'

import roomTable from './RoomTable.js';

function mapStateToProps(state) {
    return {
        rooms: state.rooms,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const controller = connect(mapStateToProps, mapDispatchToProps)(roomTable);

export default controller;



