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

import CreateClienteForm from './create_cliente'
import UpdateClienteForm from './update_cliente';

const showCheckB = false;
var divTableStyle = {
  padding:'10%',
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
      clients: undefined, 
      currentClient:undefined,
      openSnack: false,
    };

    //metodos usados en esta clase
    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleAddOpen = this.handleAddOpen.bind(this);
    this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidlMount.bind(this);
    this.handleAddClient = this.handleAddClient.bind(this);
    this.handleEditClient = this.handleEditClient.bind(this);
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
    var editClient = this.refs['EditClient'];
    this.setState({currentClient: client}); 
    editClient.setState({
      nombre: client.nombre,
      apellido:client.apellido,
      cedula:client.cedula,
      telefono:client.telefono,
      nacionalidad:client.nombre_nacionalidad,
      mail:client.mail
    });
    editClient.handleEditOpen();
  }

  handleAddOpen(){
    this.refs['AddClient'].handleAddOpen();
  }

  handleDeleteOpen(client){
    this.setState({open: true, currentClient: client});
  }

  handleClose(){
    this.setState({open: false});
  };

  componentWillMount(){
    $.ajax({
            context: this,
            url: '/api/clientes/getClients',
            dataType: 'json',
            type: 'POST',
            async:false,
            cache: false,
        }).done(function (data) {
           if(data.success !== false){
            console.log(data.clients);
            this.setState({clients: data.clients});
           }else
            console.log("no se pudo obtener clientes"); 
        });
  };

  componentDidlMount(){
    /*var addClient = this.refs["AddClient"];
    var editClient = this.refs["EditClient"];
    addClient.setState({clients: this.state.clients});
    editClient.setState({clients: this.state.clients});*/
  }

  handleAddClient(){
    var addClient = this.refs["AddClient"];
    console.log("on add Cliente");
    $.ajax({
            context: this,
            url: '/api/clientes/create',
            dataType: 'json',
            type: 'POST',
            async: false,
            cache: false,
            data:{
                nombre: addClient.state.nombre,
                apellido:addClient.state.apellido,
                cedula:addClient.state.cedula,
                telefono:addClient.state.telefono,
                nacionalidad:addClient.state.nacionalidad,
                mail:addClient.state.mail
            }
        }).done(function (data) {
            if(data.success === true){
              console.log('on create client success');
                this.state.clients.push(data.client[0]);
                this.setState({clients:this.state.clients});
                addClient.setState({
                  open:false, 
                  openSnack: true,
                  clients:this.state.clients
                });
            }else{
                console.log("no se pudo crear el cliente");
            }
        });
  }

  handleEditClient(){
    var editClient = this.refs["EditClient"];
    $.ajax({
            context: this,
            url: '/api/clientes/update',
            dataType: 'json',
            type: 'POST',
            async: false,
            cache: false,
            data:{
                clientId:this.state.currentClient.id_cliente,
                nombre: editClient.state.nombre,
                apellido:editClient.state.apellido,
                cedula:editClient.state.cedula,
                telefono:editClient.state.telefono,
                nacionalidad:editClient.state.nacionalidad,
                mail:editClient.state.mail
            }
        }).done(function (data) {
          console.log("Cliente Edited");
          console.log(data.client[0]);
            if(data.success == true){

                this.state.clients.map( function (client){
                  if(client.id_cliente === this.state.currentClient.id_cliente){
                    client.nombre = data.client[0].nombre;
                    client.apellido = data.client[0].apellido;
                    client.cedula = data.client[0].cedula;
                    client.telefono = data.client[0].telefono;
                    client.mail = data.client[0].mail;
                    client.nombre_nacionalidad = data.client[0].nombre_nacionalidad;
                    client.fk_nacionalidad = data.client[0].fk_nacionalidad;
                  }
                  return client;
                }, this);

                this.setState({clients:this.state.clients});
                editClient.setState({
                  open:false, 
                  openSnack: true,
                  clients:this.state.clients
                });
            }else{
                console.log("no se pudo editar el cliente");
            }
        });
  }

  handleDeleteClient(){
    var addClient = this.refs["AddClient"];
    var editClient = this.refs["EditClient"];
    $.ajax({
            context: this,
            url: '/api/clientes/delete',
            dataType: 'json',
            type: 'POST',
            async: false,
            cache: false,
            data:{
                clientId: this.state.currentClient.id_cliente         }
        }).done(function (data) {
            if(data.success == true){

               var clientes = this.state.clients.filter(function (client){
                  return client.id_cliente !== this.state.currentClient.id_cliente;
               }, this);
               this.setState({open: false, openSnack: true, clients:clientes});
               addClient.setState({clients:clientes});
               editClient.setState({clients:clientes});
            }else{
                console.log("no se pudo eliminar");
            }
        });
  }

  handleSnackClose(){
    this.setState({openSnack: false});
  }




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
        onTouchTap={this.handleDeleteClient}
      />,
    ];

    return (
                
          <div>
            <CreateClienteForm ref='AddClient' onTouchTap={this.handleAddClient}/>
            <UpdateClienteForm ref='EditClient' onTouchTap={this.handleEditClient}/>
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
                  <TableHeaderColumn colSpan="6" style={{textAlign: 'center'}}>
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
                  <TableHeaderColumn style={headerTableStyle}>Apellido</TableHeaderColumn>
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
                this.state.clients.map(function (client,i){
                  return (
                      <TableRow key={i}>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.nombre} </TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.apellido}</TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.cedula}</TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.nombre_nacionalidad}</TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.telefono}</TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{client.mail}</TableRowColumn>
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

