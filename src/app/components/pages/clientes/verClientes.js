import React, {Component} from 'react';
import {AppBar, List, Drawer, ListItem, Dialog, FlatButton, RaisedButton} from 'material-ui';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

export default class VerClientes extends Component {

  constructor(props){
    super(props);
    this.state = {open: false};
    //this.handleEditOpen = this.handleEditOpen.bind(this);
    //this.handleAddOpen = this.handleAddOpen.bind(this);
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
  
  /*handleEditOpen(){
    this.refs['AddSuite'].handleEditOpen();
  }

  handleAddOpen(){
    this.refs['AddSuite'].handleAddOpen();
  }*/

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
    
            <Dialog
              title="Eliminar Cliente"
              actions={actions}
              modal={true}
              open={this.state.open}
            >
              Esta seguro que desea eliminar este cliente?
            </Dialog>
            <div style={divTableStyle}>
             <Table >
              
              <TableHeader
                displaySelectAll={showCheckB}
                adjustForCheckbox={showCheckB}
              >
                <TableRow>
                  <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                    <span style={{color: darkBlack}}><h3>Clientes</h3></span>
                  </TableHeaderColumn>
                  <TableHeaderColumn colSpan="1" tooltip="Agregar Cliente" style={{textAlign: 'center'}}>
                    <span ><FloatingActionButton mini={true} onTouchTap={this.handleAddOpen}>
                            <ContentAdd />
                          </FloatingActionButton>
                    </span>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn style={headerTableStyle}>Nombre</TableHeaderColumn>
                  <TableHeaderColumn style={headerTableStyle}>Cedula</TableHeaderColumn>
                  <TableHeaderColumn style={headerTableStyle}>Nacionalidad</TableHeaderColumn>
                  <TableHeaderColumn style={headerTableStyle}>Telefono</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody
                displayRowCheckbox={showCheckB}
                >
                <TableRow>
                  <TableRowColumn>client1</TableRowColumn>
                  <TableRowColumn>82839402738</TableRowColumn>
                  <TableRowColumn>Ecuatoriano</TableRowColumn>
                  <TableRowColumn>2736485</TableRowColumn>
                  <TableRowColumn><span>{this.rightIconMenu}</span></TableRowColumn>

                </TableRow>
                <TableRow>
                  <TableRowColumn>client2</TableRowColumn>
                  <TableRowColumn>82839402738</TableRowColumn>
                  <TableRowColumn>Ecuatoriano</TableRowColumn>
                  <TableRowColumn>2736485</TableRowColumn>
                  <TableRowColumn><span>{this.rightIconMenu}</span></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>client3</TableRowColumn>
                  <TableRowColumn>82839402738</TableRowColumn>
                  <TableRowColumn>Ecuatoriano</TableRowColumn>
                  <TableRowColumn>2736485</TableRowColumn>
                  <TableRowColumn><span>{this.rightIconMenu}</span></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>client4</TableRowColumn>
                  <TableRowColumn>82839402738</TableRowColumn>
                  <TableRowColumn>Ecuatoriano</TableRowColumn>
                  <TableRowColumn>2736485</TableRowColumn>
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

