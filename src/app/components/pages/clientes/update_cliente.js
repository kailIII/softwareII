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
            nombre:'',
            cedula: "",
            telefono: "",
            nacionalidad: "Ecuatoriana",
            mail:'',
            errorMail:null,
            open: false,
            openSnack: false,
            disable:false
        };

    /*funciones utilizadas*/
        this.onCreateClientSubmit = this.onCreateClientSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onCedulaChange = this.onCedulaChange.bind(this);
        this.onNacionalidadChange = this.onNacionalidadChange.bind(this);
        this.onTelefonoChange = this.onTelefonoChange.bind(this);
        this.onMailChange = this.onMailChange.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.onKeypressNombre = this.onKeypressNombre.bind(this);
        this.onKeypressApellido = this.onKeypressApellido.bind(this);
        this.onKeypressTelefono = this.onKeypressTelefono.bind(this);
        this.onKeypressCedula = this.onKeypressCedula.bind(this);
        this.onKeypressMail = this.onKeypressMail.bind(this);
    }

    onLastNameChange(event){
        this.setState({apellido:event.target.value});
    }
    onNameChange(event){
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

    onKeypressNombre(event){
        var chr = event.key;
        var exp = /^[a-z]$/i
        console.log(chr);
        if (!exp.test(chr) && chr!=='Backspace' && chr!==' ' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift'){ 
          event.preventDefault();
        }else if(this.state.nombre.length>=25 && chr !== 'Backspace' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift')
        {
          event.preventDefault();  
        } 
    }

    onKeypressApellido(event){
        var chr = event.key;
        var exp = /^[a-z]$/i
        console.log(chr);
        if (!exp.test(chr) && chr!=='Backspace' && chr!==' ' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift'){ 
          event.preventDefault();
        }else if(this.state.apellido.length>=25 && chr !== 'Backspace' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift')
        {
          event.preventDefault();  
        } 
    }

    onKeypressCedula(event){
        var chr = event.key;
        var exp = /^[0-9]$/i
        console.log(chr);
        if (!exp.test(chr) && chr!=='Backspace' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift'){ 
          event.preventDefault();
        }else if(this.state.cedula.length>=10 && chr !== 'Backspace' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift')
        {
          event.preventDefault();  
        } 
        
    }

    onKeypressTelefono(event){
        var chr = event.key;
        var exp = /^[0-9]$/i
        console.log(chr);
        if (!exp.test(chr) && chr!=='Backspace' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift'){ 
          event.preventDefault();
        }else if(this.state.telefono.length>=10 && chr !== 'Backspace' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift')
        {
          event.preventDefault();  
        }
    }

    onKeypressMail(event){
        var chr = event.key;
        if(this.state.mail.length>=30 && chr !== 'Backspace' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift')
        {
          event.preventDefault();  
        }
    }

    onCedulaChange(event){
        this.setState({cedula:event.target.value});
    }
    onNacionalidadChange(event, index, value){
        this.setState({nacionalidad:value});
    }
    onTelefonoChange(event){
        this.setState({telefono:event.target.value});
    }
    onMailChange(event){
        const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var error=null, disabled=false;
        if(!exp.test(event.target.value) && event.target.value !== ""){
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
                    onKeyDown={this.onKeypressNombre}
                        /><br />
                        <TextField
                    hintText="Apellido"
                    floatingLabelText="Apellido"
                    value={this.state.apellido}
                    onChange={this.onLastNameChange}
                    onKeyDown={this.onKeypressApellido}
                        /><br />
                        <TextField
                    hintText="Telefono"
                    floatingLabelText="Telefono"
                    value={this.state.telefono}
                    onChange={this.onTelefonoChange}
                    onKeyDown={this.onKeypressTelefono}
                        /><br />
                                <TextField
                    hintText="Cedula"
                    floatingLabelText="Cedula"
                    value={this.state.cedula}
                    onChange={this.onCedulaChange}
                    onKeyDown={this.onKeypressCedula}
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
                    onKeyDown={this.onKeypressMail}
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

