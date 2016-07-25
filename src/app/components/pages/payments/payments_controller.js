import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/payments.js'

import Show_Payments from './show_payments.js';

function mapStateToProps(state) {
    return {
        guests: state.guests,
        payments: state.payments,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const controller = connect(mapStateToProps, mapDispatchToProps)(Show_Payments);
export default controller;
