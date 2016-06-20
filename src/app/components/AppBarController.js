import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'

import main from './Main';

function mapStateToProps(state) {
    return {
        spreadSheetStatus: state.spreadsheet.status,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const controller = connect(mapStateToProps, mapDispatchToProps)(main);

export default controller;
