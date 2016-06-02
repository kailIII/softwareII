/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React, {Component, PropTypes} from 'react';
import {AppBar, List, Drawer, ListItem, Dialog, FlatButton, RaisedButton} from 'material-ui';
import {deepOrange500} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Router } from 'react-router';


const darkMuiTheme = getMuiTheme(darkBaseTheme);

const contextTypes = {
    router: PropTypes.object,
    pushProfilesRoute: React.PropTypes.func
};

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
      //        var value = this.value;
      console.log(this);
      var value = this.props.value;
      //console.log("VALUE: " + value);
  }
  handleToggle() {
    this.setState({open: !this.state.open});
      console.log("open");
   }
    handleClose() {
              console.log(this);
//      var value = this.value;
//      console.log("VALUE: " + value);
    this.setState({
        open: false
    });

    }
  render() {


    return (
        <div>
            <Drawer
                  docked={false}
                  open={this.state.open}>
                  <List
                      >
                      <ListItem >Reservar Habitación</ListItem>
                      <ListItem onTouchTap={this.handleClose}>Clientes</ListItem>
                      <ListItem onTouchTap={this.handleClose}>Habitación</ListItem>
                      <ListItem onTouchTap={this.handleClose} value="/tipo-habitacion">Tipos de Habitación</ListItem>
            <ListItem onTouchTap={this.handleClose}  value="/usuario">Usuarios</ListItem>
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
