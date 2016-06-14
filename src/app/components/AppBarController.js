import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'

import main from './Main';

function mapStateToProps(state) {
    return {
        isSelectingDate: state.spreadsheet.isSelectingDate,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const controller = connect(mapStateToProps, mapDispatchToProps)(main);

export default controller;
