
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {blue50, blue900} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class ClientDialog extends React.Component
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
            open: false,
            openSnack: false,
            disabled:true,
            dialogText: "",
            buttonText: "",
            message: "",
            client_id: 0
        };

        /*funciones utilizadas*/
        this.onNameChange = this.onNameChange.bind(this);
        this.onCedulaChange = this.onCedulaChange.bind(this);
        this.onNacionalidadChange = this.onNacionalidadChange.bind(this);
        this.onTelefonoChange = this.onTelefonoChange.bind(this);
        this.onMailChange = this.onMailChange.bind(this);
        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.onKeypressNombre = this.onKeypressNombre.bind(this);
        this.onKeypressTelefono = this.onKeypressTelefono.bind(this);
        this.onKeypressCedula = this.onKeypressCedula.bind(this);
        this.onKeypressMail = this.onKeypressMail.bind(this);
        this.addOrEditClient = this.addOrEditClient.bind(this);
    }

    handleAddOpen(){
         this.setState({
            open: true,
            nombre:'',
            cedula: "",
            telefono: "",
            nacionalidad: "Ecuatoriana",
            mail:'',
            openSnack: false,
            disabled:true,
            dialogText: "Nuevo Cliente",
            buttonText: "Agregar",
            message: "Se agrego nuevo cliente"
        });
    }
    handleEditOpen(client){
         this.setState({
            open: true,
            nombre:client.nombre,
            cedula: client.cedula,
            telefono: client.telefono,
            nacionalidad: client.nacionalidad,
            mail:client.email,
            openSnack: false,
            disabled:true,
            dialogText: "Editar Cliente",
            buttonText: "Actualizar",
            message: "Se actualizaron los datos del cliente",
            client_id: client.client_id
        });
    }

    handleClose(){
        this.setState({open: false});
    }
    handleRequestClose(){
        this.setState({openSnack: false});
    }

    isValidExpFormat(exp,chr){ //Valida los caracteres ingresados en los campos de formularios con una expresion dada
        let isValidExp = !exp.test(chr)
        let controlKeysAllowed =  (chr!=='Backspace' && chr!==' ' && chr!=='Tab' && chr!=='Shift')
        let arrowKeysAllowed =  (chr!=='ArrowLeft' && chr!=='ArrowRight' )

        return (isValidExp && controlKeysAllowed && arrowKeysAllowed) 
    }
    preventMaxLength(field,maxLen,chr){ //Verifica si el string ingresado a un cierto campo llego a us maxima longitud
        let controlKeysAllowed =  (chr!=='Backspace' && chr!=='Tab' && chr!=='Shift')
        let arrowKeysAllowed =  (chr!=='ArrowLeft' && chr!=='ArrowRight' )

        return (field.length>=maxLen && controlKeysAllowed && arrowKeysAllowed) 
    }
    onKeypressNombre(event){ //previene ingresar numero o caracteres especiales en campo nombre
        
        if (this.isValidExpFormat(/^[a-z]$/i,event.key)){ 
          event.preventDefault();
        }else if(this.preventMaxLength(this.state.nombre,25,event.key))
        {
          event.preventDefault();  
        } 
    }
    onKeypressCedula(event){ //previene ingresar caracteres que no sean digitos en campo Cedula
        
        if (this.isValidExpFormat(/^[0-9]$/i, event.key)){ 
          event.preventDefault();
        }else if(this.preventMaxLength(this.state.cedula,10,event.key))
        {
          event.preventDefault();  
        } 
        
    }
    onKeypressTelefono(event){ //previene ingresar caracteres que no sean digitos en campo telefono
    
        if (this.isValidExpFormat(/^[0-9]$/i, event.key)){ 
          event.preventDefault();
        }else if(this.preventMaxLength(this.state.telefono,10, event.key))
        {
          event.preventDefault();  
        }  
    }
    onKeypressMail(event){ //previene ingresar un numero de caracteres mayor a us maximo en el campo mail
        
        if(this.preventMaxLength(this.state.mail,30, event.key))
        {
          event.preventDefault();  
        }
    }

    onNameChange(event){
        let disable = true;
        if(event.target.value != "" && this.state.cedula !="")
            disable = false

        this.setState({nombre:event.target.value, disabled:disable});
    }
    onCedulaChange(event){
        let disable = true;
        if(event.target.value != "" && this.state.nombre !="")
            disable = false

        this.setState({cedula:event.target.value, disabled:disable});
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

    addOrEditClient(){
        let clients = this.props.clientProps.clients;
        let props = this.props.clientProps;
        let id = this.state.client_id;
        let type = "EDIT_CLIENT";

        if(this.state.buttonText === "Agregar"){
            let lastClient = clients[clients.length - 1];
            id = lastClient.client_id + 1;
            type = "ADD_CLIENT";
        }
        
        props.addOrEditClient(id, this.state.nombre, this.state.cedula, this.state.nacionalidad, 
                                this.state.telefono, this.state.mail, type);

        this.setState({open: false, openSnack: true});
    }


    render(){
        const actions = [
          <FlatButton
            label="Cancelar"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label={this.state.buttonText}
            primary={true}
            onTouchTap={this.addOrEditClient}
            disabled={this.state.disabled}
          />,
        ];

        return (
            <div>
                <Dialog
                  title={this.state.dialogText}
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
                    floatingLabelText="Nombre *"
                    onChange={this.onNameChange}
                    onKeyDown={this.onKeypressNombre}
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
                    floatingLabelText="Cedula *"
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
                  message={this.state.message}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
           </div>     
        );
    }
}

