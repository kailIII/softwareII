import React, {Component} from 'react';
import {AppBar, List, Drawer, ListItem, Dialog, FlatButton, RaisedButton} from 'material-ui';
import {deepOrange500} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Router } from 'react-router';

import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {grey400, grey900, blueGrey50, darkBlack, lightBlack, blue50, cyan200, blue900} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import Header from '../../Main';
import AddSuiteModal from './AddSuite'; 
import AddSuiteForm from './AddSuite';

const muiTheme = getMuiTheme({
  palette: {
    borderColor: cyan200,
  }
});



const showCheckB = false;

var divTableStyle = {
  padding:'10%',
  background:blue50

};

var headerTableStyle = {
  color:blue900
};

export default class Suites extends Component {

  constructor(props){
    super(props);
    this.state = {open: false};
    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleAddOpen = this.handleAddOpen.bind(this);
    this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    this.rightIconMenu = (
      <IconMenu iconButtonElement={this.iconButtonElement}>
        <MenuItem onTouchTap={this.handleEditOpen}>Editar</MenuItem>
        <MenuItem onTouchTap={this.handleDeleteOpen}>Eliminar</MenuItem>
      </IconMenu>
    );
  }
  
  handleEditOpen(){
    this.refs['AddSuite'].handleEditOpen();
  }

  handleAddOpen(){
    this.refs['AddSuite'].handleAddOpen();
  }

  handleDeleteOpen(){
    this.setState({open: true});
  }

  handleClose(){
    this.setState({open: false});
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Aceptar"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (

        <MuiThemeProvider muiTheme={muiTheme}>
                
          <div>
            <Header/>
            <AddSuiteModal ref="AddSuite" />
            <Dialog
              title="Eliminar Habitación"
              actions={actions}
              modal={true}
              open={this.state.open}
            >
              Esta seguro que desea eliminar esta Habitación?
            </Dialog>
            <div style={divTableStyle}>
             <Table >
              
              <TableHeader
                displaySelectAll={showCheckB}
                adjustForCheckbox={showCheckB}
              >
                <TableRow>
                  <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                    <span style={{color: darkBlack}}><h3>Habitaciones</h3></span>
                  </TableHeaderColumn>
                  <TableHeaderColumn colSpan="1" tooltip="Agregar Habitación" style={{textAlign: 'center'}}>
                    <span ><FloatingActionButton mini={true} onTouchTap={this.handleAddOpen}>
                            <ContentAdd />
                          </FloatingActionButton>
                    </span>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn style={headerTableStyle}>Nombre</TableHeaderColumn>
                  <TableHeaderColumn style={headerTableStyle}>Tipo</TableHeaderColumn>
                  <TableHeaderColumn style={headerTableStyle}>Capacidad</TableHeaderColumn>
                  <TableHeaderColumn style={headerTableStyle}>Estado</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody
                displayRowCheckbox={showCheckB}
                >
                <TableRow>
                  <TableRowColumn>Hab1</TableRowColumn>
                  <TableRowColumn>Single</TableRowColumn>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>Limpia</TableRowColumn>
                  <TableRowColumn><span>{this.rightIconMenu}</span></TableRowColumn>

                </TableRow>
                <TableRow>
                  <TableRowColumn>Hab2</TableRowColumn>
                  <TableRowColumn>Single</TableRowColumn>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>Limpia</TableRowColumn>
                  <TableRowColumn><span>{this.rightIconMenu}</span></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Hab3</TableRowColumn>
                  <TableRowColumn>Single</TableRowColumn>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>Limpia</TableRowColumn>
                  <TableRowColumn><span>{this.rightIconMenu}</span></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Hab4</TableRowColumn>
                  <TableRowColumn>Single</TableRowColumn>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>Limpia</TableRowColumn>
                  <TableRowColumn><span>{this.rightIconMenu}</span></TableRowColumn>
                </TableRow>
              </TableBody>

            </Table>

          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}



export default Suites;