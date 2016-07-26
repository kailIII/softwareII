import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {blue50, blue900} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class UpdateClienteForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            apellido:'',
            errorApellido: null,
            nombre:'',
            errorNombre: null,
            cedula: "",
            errorCedula: null,
            telefono: "",
            errorTelefono: null,
            nacionalidad: "Ecuatoriana",
            errorNacionalidad: null,
            mail:'',
            errorMail:null,
            open: false,
            openSnack: false,
            disable:false
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
        this.onMailChange = this.onMailChange.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
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
    handleEditOpen(){
     this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false});
    };

    handleRequestClose(){
        this.setState({openSnack: false});
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
    onNacionalidadChange(event, index, value){
        this.setState({nacionalidad:value});
    }
    onTelefonoChange(event){
        this.validarTelefono(event);
        this.setState({telefono:event.target.value});
    }
    onMailChange(event){
        const exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var error=null, disabled=false;
        if(exp.test(event.target.value)){
            error="Correo no valido";
            disabled=true;
        }

        this.setState({
            errorMail:error,
            disabled:disabled, 
            mail:event.target.value
        });
    }

    render(){
        const actions = [
          <FlatButton
            label="Cancelar"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Actualizar"
            primary={true}
            onTouchTap={this.props.onTouchTap}
            disabled={this.state.disabled}
          />,
        ];

        return (
            <div>
                <Dialog
                  title={"Editar Cliente"}
                  actions={actions}
                  modal={true}
                  open={this.state.open}
                >
                  <div style = {{color:blue900}}>
                    <hr/><br/>
                    <form>
                        <TextField
                    hintText="Nombre"
                    value={this.state.nombre}
                    floatingLabelText="Nombre"
                    onChange={this.onNameChange}
                    errorText={this.state.errorNombre}
                        /><br />
                        <TextField
                    hintText="Apellido"
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
                  Nacionalidad:
                  <DropDownMenu value={this.state.nacionalidad} onChange={this.onNacionalidadChange}>
                      <MenuItem value={"Ecuatoriana"} primaryText="Ecuatoriana" />
                      <MenuItem value={"Argentino"} primaryText="Argentino" />
                      <MenuItem value={"Boliviana"} primaryText="Boliviana" />
                      <MenuItem value={"Brasileña"} primaryText="Brasileña" />
                      <MenuItem value={"Chilena"} primaryText="Chilena" />
                      <MenuItem value={"Colombiana"} primaryText="Colombiana" />
                      <MenuItem value={"Paraguaya"} primaryText="Paraguaya" />
                      <MenuItem value={"Peruana"} primaryText="Peruana" />
                      <MenuItem value={"Uruguaya"} primaryText="Uruguaya" />
                      <MenuItem value={"Venezolana"} primaryText="Venezolana" />
                  </DropDownMenu><br />
                                <TextField
                    hintText="Correo"
                    floatingLabelText="Correo"
                    value={this.state.mail}
                    onChange={this.onMailChange}
                    errorText={this.state.errorMail}
                        /><br />
                        
                    </form>
                  </div> 
                </Dialog>

                <Snackbar
                  open={this.state.openSnack}
                  message="Cliente actualizado"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
           </div>     
        );
    }
}

