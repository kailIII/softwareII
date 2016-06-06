import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
export default class CreateUserForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
	    apellido:'',
	    nombre:'',
            rol:{value:1, name:"ADMINISTRACION"},
            errorUsuario: null,
            errorNombre: null,
            errorApellido: null
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRolChange = this.onRolChange.bind(this);
        this.onCreateUserSubmit = this.onCreateUserSubmit.bind(this);
        this.validarUsuario = this.validarUsuario.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
	this.validarNombre = this.validarNombre.bind(this);
		this.validarLastName = this.validarLastName.bind(this);
    }
    onLastNameChange(event){
	this.validarLastName(event);
	this.setState({apellido:event.target.value});
    }
    onNameChange(event){
	this.validarNombre(event);
		this.setState({nombre:event.target.value});
    }
    onCreateUserSubmit(){
        console.log(this.state); //valores a enviar en formulario
        /*Validaciones*/

    }
    validarNombre(event){
	 const username = event.target.value;
  const alphanumeric = /^[a-zA-Z]+$/i;
  const usernameIsValid = alphanumeric.test(username);
  var error;

  if (usernameIsValid) {
   error = null;
  } else {
   error = 'usuario solo tiene letras.';
  }

	this.setState({ errorNombre: error }); 
    }
        validarLastName(event){
	 const username = event.target.value;
  const alphanumeric = /^[a-zA-Z]+$/i;
  const usernameIsValid = alphanumeric.test(username);
  var error;

  if (usernameIsValid) {
   error = null;
  } else {
   error = 'Apellido solo tiene letras.';
  }

	this.setState({ errorApellido: error }); 
    }
    validarUsuario(event){
        const username = event.target.value;
        const alphanumeric = /^[a-z0-9]+$/i;
        const usernameIsValid = alphanumeric.test(username);
        var error;

        if (usernameIsValid) {
            error = null;
        } else {
            error = 'usuario solo tiene letras y numeros.';
        }

        this.setState({ errorUsuario: error });
    }
    onUsernameChange(event, index, value){
        this.validarUsuario(event);
        this.setState( {username: event.target.value});
    }
    onPasswordChange(event, index, value){
        this.setState( {password: event.target.value});
    }
    onRolChange(event, index, value){
        if(value === 1){
            console.log(value);
            this.setState({rol:{
                value:value, name:"ADMINISTRACION"
            }},function(){
                console.log(this.state);
            });
        }else if(value === 2){
            console.log(value);
            this.setState({rol:{
                value:value, name:"SECRETARIO"
            }},function(){
                console.log(this.state);
            });
        }else if(value === 3){
            console.log(value);
            this.setState({rol:{
                value:value, name:"CONTADOR"
            }},function(){
                console.log(this.state);
            });
        }
        //console.log(this.state);
    }
    render(){
        return (
                <form>
                <TextField
            hintText="Nombre Completo"
            value={this.state.nombre}
            onChange={this.onNameChange}
            errorText={this.state.errorNombre}
                /><br />
                <TextField
            hintText="Apellido Completo"
            value={this.state.apellido}
            onChange={this.onLastNameChange}
            errorText={this.state.errorApellido}
                /><br />
                <TextField
            hintText="Username"
            value={this.state.username}
            onChange={this.onUsernameChange}
            errorText={this.state.errorUsuario}
                /><br />
                <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
                /><br />
                <SelectField maxHeight={300} value={this.state.rol.value} onChange={this.onRolChange}>
                <MenuItem value={1} primaryText="ADMINISTRADOR" />
                <MenuItem value={2} primaryText="SECRETARIO" />
                <MenuItem value={3}  primaryText="CONTADOR" />
                </SelectField>
                <br/>
                <RaisedButton
            label="Crear Usuario"
            onClick={this.onCreateUserSubmit}
                />
                </form>
        );
    }
}

export default CreateUserForm;
