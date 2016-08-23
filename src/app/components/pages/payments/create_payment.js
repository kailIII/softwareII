import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {blue50, blue900} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const styles ={
    customWidth: {
        width:150,
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
            payment: 0.0,
            description: "",
            guest: {
                nombre: "test",
                cedula: "test",
            },
            errorPayment: "",
            errorDescripcion: "",
        };

        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAddPayment = this.handleAddPayment.bind(this);
        this.onCedulaChange = this.onCedulaChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPaymentChange = this.onPaymentChange.bind(this);

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
        this.props.update();
        this.props.payments.push({
            cedula:this.state.cedula,
            valor: this.state.payment ,
            description:this.state.description,
            pagado: false,
        }
        );
    };

    onCedulaChange(event, index, value){

        this.setState({cedula: value});

    }

    onDescriptionChange (event) {
        this.setState({description: event.target.value});
    }

    onPaymentChange (event) {
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
                disabled={this.state.disabled}
                onTouchTap={this.handleAddPayment}
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
                      hintText="Valor del pago"
                      value={this.state.payment}
                      onChange={this.onPaymentChange}
                      errorText={this.state.errorPayment}
                  /><br />
                  <TextField
                      hintText="Descripcion"
                      value={this.state.description}
                      onChange={this.onDescriptionChange}
                      errorText={this.state.errorDescription}
                  /><br />
                  <AutoComplete
                      floatingLabelText="Escriba el nombre del cliente"
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={this.props.guests.map(function (guest, i) {
                              return (
                                  <MenuItem value={guest.cedula} primaryText={guest.nombre + " "+ guest.cedula} onChange={this.onCedulaChange}/>
                              );
                          }, this)}
		      maxSearchResults={5}		      
                  >

                  </AutoComplete>
                  <SelectField maxHeight={300} value={this.state.cedula} onChange={this.onCedulaChange}>
                    {this.props.guests.map(function (guest, i) {
                         return (
                             <MenuItem value={guest.cedula} primaryText={guest.nombre + " "+ guest.cedula} onChange={this.onCedulaChange}/>
                         );
                     }, this)}
                </SelectField>
                <br/>
                </form>
              </div>
                </Dialog>
        );
    }
}

export default CreatePaymentForm;
