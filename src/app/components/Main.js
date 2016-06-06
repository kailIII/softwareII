/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React, {Component, PropTypes} from 'react';
import {AppBar, List, Drawer, ListItem, Dialog, FlatButton, RaisedButton} from 'material-ui';
import { Route, Router } from 'react-router';
import Link from 'react-router';


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

    return (
        <div>
            <AppBar
              title="Hotel Tabuba"
              onLeftIconButtonTouchTap={this.handleToggle}
              />

            <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}>
              <List>
                  <ListItem >Reservar Habitación</ListItem>
                  <ListItem onTouchTap={this.handleClose}>Clientes</ListItem>
                  <ListItem onTouchTap={this.handleClose}>Habitación</ListItem>
                  <ListItem onTouchTap={this.handleClose} value="/tipo-habitacion">Tipos de Habitación</ListItem>
                  <ListItem onTouchTap={this.handleClose} linkButton={true}><a href="/#/usuario">Usuarios</a></ListItem>
              </List>
            </Drawer>

            {this.props.children}
        </div>
    );
  }
}

export default Header;
