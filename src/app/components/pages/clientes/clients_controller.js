import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import * as actionCreators from '../../../actions/clients.js'

import Show_Payments from './verClientes.js';

function mapStateToProps(state) {
    return {
        clients: state.clients,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const controller = connect(mapStateToProps, mapDispatchToProps)(verClientes);
export default controller;