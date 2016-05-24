import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, Drawer, ListItem, Dialog, FlatButton} from 'material-ui';
import {deepOrange500} from 'material-ui/styles/colors';
import Header from '../../Main';
import Rol_Usuario from './helpers/rol_usuario';
import Crear_Usuario from './crear_usuario';
const style = {
 marginLeft: 20,
};

export default class Mostrar_Usuario extends React.Component{

 constructor(props, context) {
  super(props);
  this.state = {open: false};
  this.state_dialog = {
   open: false
  };
  this.handleTouchTap = this.handleTouchTap.bind(this);
  this.handleToggle = this.handleToggle.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleOpen = this.handleOpen.bind(this);
  this.handleMostrarAgregarUsuario = this.handleMostrarAgregarUsuario.bind(this);
 }

 handleMostrarAgregarUsuario(){
  this.state_dialog.open = true;
  console.log(this);
  console.log(this.state_dialog.open);
 }
 handleOpen(){
  console.log(this);
  this.setState({open: true});
 }
 handleTouchTap(){
  console.log("touch");
 }
 handleToggle(){
  console.log("toggle");
 }
 handleClose(){
  console.log("close");
  this.state_dialog.open = false;
  this.setState({open: false});
 }
 render() {


  return (
   <div>
    <Header />
    <br/>

    <FlatButton label ="Agregar Usuario" onTouchTap={this.handleOpen}>
     <Dialog
         title="Scrollable Dialog"
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose}
         autoScrollBodyContent={true}>
      < Crear_Usuario/>
</Dialog>
</FlatButton>
<br/>
<Table>
 <TableHeader>
  <TableRow>
   <TableHeaderColumn>Rol</TableHeaderColumn>
   <TableHeaderColumn>Usuario</TableHeaderColumn>
   <TableHeaderColumn>Password</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
     <TableRow>
      <TableRowColumn>< Rol_Usuario /></TableRowColumn>
      <TableRowColumn>John Smith</TableRowColumn>
      <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
       <TableRowColumn>< Rol_Usuario /></TableRowColumn>
       <TableRowColumn>Randal White</TableRowColumn>
       <TableRowColumn>Unemployed</TableRowColumn>
      </TableRow>
      <TableRow>
       <TableRowColumn>< Rol_Usuario /></TableRowColumn>
       <TableRowColumn>Stephanie Sanders</TableRowColumn>
       <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
       <TableRowColumn>< Rol_Usuario /></TableRowColumn>
       <TableRowColumn>Steve Brown</TableRowColumn>
       <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
   </div>
  );
 }
}
