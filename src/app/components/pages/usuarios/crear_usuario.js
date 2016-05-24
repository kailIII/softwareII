import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';


const style = {
 marginLeft: 20,
};
export default class Crear_Usuario extends React.Component{
 constructor(props) {
  super(props);
  this.state = {value: 1};
  
 }

 handleChange(event, index, value){

  this.setfireState({value})}
 
 render() {
  return (
  <div>
   <AppBar
       title="Creacion de Usuario"
       iconClassNameRight="muidocs-icon-navigation-expand-more"
   />
   <Paper zDepth={2}>
    <TextField hintText="Nombre del Usuario" style={style} underlineShow={false} />
    <Divider />
    <br/>
    <SelectField maxHeight={300} value={this.state.value} onChange={this.handleChange}>
     <MenuItem value={1} primaryText="ADMINISTRADOR" />
     <MenuItem value={2} primaryText="SECRETARIO" />
     <MenuItem value={3} primaryText="CONTADOR" />
        </SelectField>
        <Divider />
        <TextField hintText="Contrasenia" style={style} underlineShow={false} />
        <Divider />
  </Paper>
  <br/>
  <RaisedButton label="Crear nuevo Usuario" style={style} />
  </div>);
 }
}
