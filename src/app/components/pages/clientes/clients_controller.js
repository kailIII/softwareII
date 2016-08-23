import { bindActionCreators } from 'redux';

import { connect } from 'react-redux'
import * as actionClients from '../../../actions/clients.js'

import VerClientes from './showClients.js';

function mapStateToProps(state) {
    return {
        clients: state.clients
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionClients, dispatch);
}

const controller = connect(mapStateToProps, mapDispatchToProps)(VerClientes);
export default controller;