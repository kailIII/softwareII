
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {blue50, blue900} from 'material-ui/styles/colors';

export default class CreateClienteForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            apellido:'',
            errorApellido: null,
            nombre:'',
            errorNombre: null,
            cedula: null,
            errorCedula: null,
            telefono: null,
            errorTelefono: null,
            nacionalidad: null,
            errorNacionalidad: null,
            open: false,
            modalTitle: 'Crear Cliente'
        };

	/*funciones utilizadas*/
        this.onCreateClientSubmit = this.onCreateClientSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.validarNombre = this.validarNombre.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.validarLastName = this.validarLastName.bind(this);
        this.onCedulaChange = this.onCedulaChange.bind(this);
        this.validarCedula = this.validarCedula.bind(this);
        this.onNacionalidadChange = this.onNacionalidadChange.bind(this);
        this.validarNacionalidad = this.validarNacionalidad.bind(this);
        this.onTelefonoChange = this.onTelefonoChange.bind(this);
        this.validarTelefono = this.validarTelefono.bind(this);
        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    onLastNameChange(event){
        this.validarLastName(event);
        this.setState({apellido:event.target.value});
    }
    onNameChange(event){
        this.validarNombre(event);
        this.setState({nombre:event.target.value});
    }
    onCreateClientSubmit(){
        console.log(this.state); //valores a enviar en formulario
        /*Validaciones*/

    }
    handleAddOpen(){
     this.setState({open: true, modalTitle:'Crear Cliente'});
    };

    handleEditOpen(){
     this.setState({open: true, modalTitle:'Editar Cliente'});
    };

    handleClose(){
        this.setState({open: false});
    };

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
    validarCedula(event){
        const username = event.target.value;
        const alphanumeric = /^[0-9]+$/i;
        const usernameIsValid = alphanumeric.test(username);
        var error;

        if (usernameIsValid) {
            error = null;
        } else {
            error = 'la cedula solo tiene numeros.';
        }

        this.setState({ errorCedula: error });
    }
    validarTelefono(event){
        const username = event.target.value;
        const alphanumeric = /^[0-9]+$/i;
        const usernameIsValid = alphanumeric.test(username);
        var error;

        if (usernameIsValid) {
            error = null;
        } else {
            error = 'El telefono solo tiene  numeros..';
        }

        this.setState({ errorTelefono: error });
    }
    validarNacionalidad(event){
        const username = event.target.value;
        const alphanumeric = /^[0-9]+$/i;
        const usernameIsValid = alphanumeric.test(username);
        var error;

        if (usernameIsValid) {
            error = null;
        } else {
            error = 'la nacionalidad es solo letras..';
        }

        this.setState({ errorNacionalidad: error });
    }
    onCedulaChange(event){
        this.validarCedula(event);
        this.setState({cedula:event.target.value});
    }
    onNacionalidadChange(event){
        this.validarNacionalidad(event);
        this.setState({nacionalidad:event.target.value});
    }
    onTelefonoChange(event){
        this.validarTelefono(event);
        this.setState({telefono:event.target.value});
    }
    render(){
        const actions = [
          <FlatButton
            label="Cancelar"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Agregar"
            primary={true}
            onTouchTap={this.handleClose}
          />,
        ];

        return (
            <Dialog
              title={this.state.modalTitle}
              actions={actions}
              modal={true}
              open={this.state.open}
            >
              <div style = {{color:blue900}}>
                <hr/><br/>
                <form>
                    <TextField
                hintText="Nombre Completo"
                value={this.state.nombre}
                floatingLabelText="Nombre"
                onChange={this.onNameChange}
                errorText={this.state.errorNombre}
                    /><br />
                    <TextField
                hintText="Apellido Completo"
                floatingLabelText="Apellido"
                value={this.state.apellido}
                onChange={this.onLastNameChange}
                errorText={this.state.errorApellido}
                    /><br />
                    <TextField
                hintText="Telefono"
                floatingLabelText="Telefono"
                value={this.state.telefono}
                onChange={this.onTelefonoChange}
                errorText={this.state.errorTelefono}
                    /><br />
                            <TextField
                hintText="Cedula"
                floatingLabelText="Cedula"
                value={this.state.cedula}
                onChange={this.onCedulaChange}
                errorText={this.state.errorCedula}
                    /><br />
                            <TextField
                hintText="Nacionalidad"
                floatingLabelText="Nacionalidad"
                value={this.state.nacionalidad}
                onChange={this.onNacionalidadChange}
                errorText={this.state.errorNacionalidad}
                    /><br />
                    
                </form>
              </div> 
            </Dialog>
                
        );
    }
}

export default CreateClienteForm;
