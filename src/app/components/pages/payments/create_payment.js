import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {blue50, blue900} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

const styles ={
    customWidth: {
        width:150,
    },
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};
export default class CreatePaymentForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            open: false,
            modalTitle: 'Crear Pago',
            cedula: -1,
            disabled: false,
            payment: 10.0,
            description: "",
            guest: {
                nombre: "nil",
                cedula: "nil",
            },
            errorPayment: "",
            errorDescription: "",
            errorCedula: "",
            pagado: false,
        };

        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAddPayment = this.handleAddPayment.bind(this);
        this.onCedulaChange = this.onCedulaChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPaymentChange = this.onPaymentChange.bind(this);
        this.validarPayment = this.validarPayment.bind(this);
        this.validarDescription = this.validarDescription.bind(this);
        this.onPagadoChange = this.onPagadoChange.bind(this);

    }

    onPagadoChange(event, checked){
        //console.log("pagado change");

        this.setState({pagado: checked});

    }

    validarDescription(value){
        const description = value;
        let error = ""
        if(description.length  === 0){
            error = "Por favor llene la descripcion";
        }else {
            error = "";
        }
        this.setState({errorDescription: error});
        return error
    }
    validarPayment(event){
        const pago = event.target.value;
        const alphanumeric = /^[a-zA-Z]+$/i;
        const PaymentNotValid = alphanumeric.test(pago);
        let error = ""
        if(PaymentNotValid === true){
            error = "Solo ingrese digitos"
        }else if(PaymentNotValid === false && pago>1000){
            error = "Valor demasiado grande..."
        }else if(PaymentNotValid === false && pago<10){
            error = "Valor mayor a 10 dolares..."
        }else{
            error = ""
        }
        this.setState({errorPayment: error});
    }


    handleAddOpen(){
        this.setState({open: true, modalTitle:'Crear nuevo pago'});
    };

    handleEditOpen(){
        this.setState({open: true, modalTitle:'Editar Pago'});
    };

    handleClose(){
        this.setState({open: false});
    };

    handleAddPayment(){
        const description = this.state.description;
        let errorDescription = "";
        errorDescription = this.validarDescription(description);
        if(errorDescription === "" && this.state.errorPayment === "" && this.state.cedula !=="nil"){
            this.props.update();
            this.props.payments.push({
                cedula:this.state.cedula,
                valor: parseFloat(this.state.payment),
                description:this.state.description,
                pagado: this.state.pagado,

            });
            console.log(this.props.payments)
            this.handleClose();
        }else if(errorDescription !== "" && this.state.cedula !== "nil"){
            this.setState({errorDescription: errorDescription});

        }else if(errorDescription === "" && this.state.cedula === "nil"){
            this.setState({errorCedula: "Escoja una opcion"});
        }else if(errorDescription !== "" && this.state.cedula === "nil"){
            this.setState({errorCedula: "Escoja una opcion"});
            this.setState({errorDescription: errorDescription});
        };
    };

    onCedulaChange(event, index, value){
        if (value === ""|| value ==="nil") {
            this.setState({errorCedula: "Escoja un cliente."});
        }
        this.setState({cedula: value});

    }

    onDescriptionChange (event) {
        //this.validarDescription(event);
        this.setState({description: event.target.value});
    }

    onPaymentChange (event) {
        this.validarPayment(event);
        this.setState({payment: event.target.value});
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
                disabled={false}
                onTouchTap={this.handleAddPayment}
            />,
        ];
        let pagado = "";
        if (this.state.pagado === true) {
            pagado ="Pagado ";
        }else{
            pagado = "No pagado";
        }
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
                      hintText="Valor del pago"
                      value={this.state.payment}
                      onChange={this.onPaymentChange}
                      errorText={this.state.errorPayment}
                      onKeyDown={this.onkeypressedPayment}
                      type="number"
                      maxLength="5"
                  /><br />
                  <TextField
                      hintText="Descripcion"
                      value={this.state.description}
                      onChange={this.onDescriptionChange}
                      errorText={this.state.errorDescription}
                      multiLine={true}
                      maxLength="20"
                  /><br />
                  <SelectField maxHeight={300}
                               value={this.state.cedula}
                               onChange={this.onCedulaChange}
                               errorText={this.state.errorCedula}>
                    {this.props.guests.map(function (guest, i) {
                         return (
                             <MenuItem value={guest.cedula} primaryText={guest.nombre + " "+ guest.cedula} onChange={this.onCedulaChange}/>
                         );
                     }, this)}
                </SelectField>
                <br/>
                <Checkbox
                    label={pagado}
                    checked={this.state.pagado}
                    style={styles.checkbox}
                    onCheck={this.onPagadoChange}
                />
                <br/>
                </form>
              </div>
                </Dialog>
        );
    }
}

export default CreatePaymentForm;
