/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React, {Component, PropTypes} from 'react';
import {AppBar, List, Drawer, MenuItem, Dialog, FlatButton, RaisedButton} from 'material-ui';
import { Route, Router } from 'react-router';
import Link from 'react-router';
import SpreadsheetStatus from '../../../constants/SpreadsheetStatus'


export default class Header extends Component {
    constructor(props, context) {
        super(props);
        this.state = {open: false};
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }

    handleToggle() {
        this.setState({open: !this.state.open});
        console.log("open");
    }

    handleClose() {
        console.log(this);
        this.setState({
            open: false,
        });

    }
    render() {

        let titleString = "Hotel Tabuba"
        if(this.props.spreadSheetStatus === SpreadsheetStatus.selectFecha)
            titleString = "Selecciona la fecha final de la reservación"
        return (
        <div>
            <AppBar
              title = {titleString}
              onLeftIconButtonTouchTap={this.handleToggle}
              />

            <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}>
            <List><MenuItem onTouchTap={this.handleClose} linkButton href="/#/home">Reservar Habitación</MenuItem>
                  <MenuItem onTouchTap={this.handleClose} linkButton href="/#clientes/"  >Clientes</MenuItem>
                  <MenuItem onTouchTap={this.handleClose} linkButton href="/#/habitaciones"  >Habitación</MenuItem>
                  <MenuItem onTouchTap={this.handleClose} linkButton href="/#/tipo-habitacion"   value="/tipo-habitacion">Tipos de Habitación</MenuItem>
                  <MenuItem onTouchTap={this.handleClose} linkButton href="/#/usuario"   linkButton={true}>usuarios</MenuItem>
                  <MenuItem onTouchTap={this.handleClose} linkButton href="/#/payments"   linkButton={true}>Pagos</MenuItem>
              </List>
            </Drawer>

            {this.props.children}
            </div>
        );
    }
}

export default Header;
