/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React, {Component} from 'react';
import {AppBar, List, Drawer, ListItem, Dialog, FlatButton, RaisedButton} from 'material-ui';
import {deepOrange500} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Router } from 'react-router';


const darkMuiTheme = getMuiTheme(darkBaseTheme);


export default class Header extends Component {
  constructor(props, context) {
    super(props);
    this.state = {open: false};
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(darkBaseTheme)};
  }

  handleTouchTap() {
    this.setState({
      open: true
    });
  }
  handleToggle() {
    this.setState({open: !this.state.open});
      console.log("open");
   }
  handleClose() { this.setState({open: false}); }
  render() {


    return (
        <div>
            <Drawer
                  docked={false}
                  open={this.state.open}>
                  <List
                      value={location.pathname}
                      >
                      <ListItem onTouchTap={this.handleClose}>Reservar Habitación</ListItem>
                      <ListItem onTouchTap={this.handleClose}>Clientes</ListItem>
                      <ListItem onTouchTap={this.handleClose}>Habitación</ListItem>
                      <ListItem onTouchTap={this.handleClose} value="/tipo-habitacion">Tipos de Habitación</ListItem>
                      <ListItem onTouchTap={this.handleClose}>Usuarios</ListItem>
                </List>
        </Drawer>
            <AppBar title="Hotel Tabuba" isInitiallyOpen={true} onLeftIconButtonTouchTap={this.handleToggle} onLeftIconButtonClick={this.handleToggle}/>
        </div>
    );
  }
}
Header.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
export default Header;
