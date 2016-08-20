import React, {Component} from 'react';
import {Dialog, FlatButton, RaisedButton} from 'material-ui';
import Subheader from 'material-ui/Subheader';
import {grey400, grey900, blueGrey50, darkBlack, lightBlack, blue50, cyan200, blue900} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';

import ClientDialog from './addOrEditDialog';

const showCheckB = false;
var divTableStyle = {
  padding:'5%',
  background:blue50

};

var headerTableStyle = {
  color:blue900,
  textAlign:'center'
};

var columnTableStyle ={textAlign:'center'};

export default class VerClientes extends Component {




  constructor(props){
    super(props);
    this.state = {
      open: false,
      openSnack: false,
      client_id: 0
    };

    //metodos usados en esta clase
    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleAddOpen = this.handleAddOpen.bind(this);
    this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDeleteClient = this.handleDeleteClient.bind(this);
    this.handleSnackClose = this.handleSnackClose.bind(this);
    
    this.iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );
  }
  
  //llamar a los metodos de la clase CreateClienteForm mediante la propiedad ref
  handleEditOpen(client){
    this.refs['ClientDialog'].handleEditOpen(client);
  }

  handleAddOpen(){
    this.refs['ClientDialog'].handleAddOpen();
  }

  handleDeleteOpen(client){
    this.setState({open: true, client_id: client.client_id});
  }

  handleClose(){
    this.setState({open: false});
  };

  handleDeleteClient(){
    this.props.removeClient(this.state.client_id);
    this.setState({open: false, openSnack: true});
  }

  handleSnackClose(){
    this.setState({openSnack: false});
  }


  render() {

    let clients = this.props.clients;
    const actions = [

      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Aceptar"
        primary={true}
        onTouchTap={this.handleDeleteClient}
      />

    ];

    return (
                
          <div>
            <ClientDialog ref='ClientDialog'  clientProps={this.props}/>
            
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
                  <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
                    <span style={{color: darkBlack}}><h2>Clientes</h2></span>
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
                  <TableHeaderColumn style={headerTableStyle}>Email</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody
                displayRowCheckbox={showCheckB}
                >
                {
                clients.map(function (client,i) {
                  return (
                      <TableRow key={client.client_id}>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.nombre} </TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.cedula}</TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.nacionalidad}</TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.telefono}</TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.email}</TableRowColumn>
                      <TableRowColumn style={columnTableStyle}>
                        <span>
                        {
                          (<IconMenu iconButtonElement={this.iconButtonElement}>
                            <MenuItem onTouchTap={this.handleEditOpen.bind(this,client)}>Editar</MenuItem>
                            <MenuItem onTouchTap={this.handleDeleteOpen.bind(this,client)}>Eliminar</MenuItem>
                          </IconMenu>)
                        }
                        </span>
                      </TableRowColumn>
                      </TableRow>
                    );            
                }, this)
                }
              </TableBody>

            </Table>

            <Snackbar
              open={this.state.openSnack}
              message="Cliente Eliminado"
              autoHideDuration={4000}
              onRequestClose={this.handleSnackClose}
            />

          </div>

        </div>
    );
  }
}

