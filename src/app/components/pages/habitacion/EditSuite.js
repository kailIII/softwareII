import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {blue50, blue900} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

const items = [];
for( let i = 1; i<=5; i++ ){
  items.push(<MenuItem value={i} primaryText={i} />);
}

var tipoItems = [];

export default class EditSuiteModal extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tipos: [],
      open: false,  
      openSnack: false,
      numero:"",
      tipo: "Single",
      capacidad:1,
      estado:"Limpia",
      suites:undefined,
      numeroValido:null,
      disabled:true,
      oldNumero:-1,
    };

    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChangeNumero = this.handleChangeNumero.bind(this);
    this.handleChangeTipo = this.handleChangeTipo.bind(this);
    this.handleChangeCapacidad = this.handleChangeCapacidad.bind(this);
    this.handleChangeEstado = this.handleChangeEstado.bind(this);
    this.onKeypressNumero = this.onKeypressNumero.bind(this);
  }

  componentWillMount(){
    $.ajax({
      context: this,
      url: '/api/tipos_habitacion/show',
      dataType: 'json',
      type: 'POST',
      async: false,
      cache: false,
      
    }).done(function (data){
        console.log("TipoHabitaciones");
        if(data !== null){
          tipoItems.splice(0,tipoItems.length);
          for(let i=0; i<data.length; i++){
            this.state.tipos.push(data[i].tipo);
            this.setState({tipos: this.state.tipos});
            tipoItems.push(<MenuItem value={data[i].tipo} primaryText={data[i].tipo} />);
          }
        }
    });
  }

  handleEditOpen(){
    this.setState({open: true, tipo: this.state.tipos[0]});
  }  

  handleClose(){
    this.setState({open: false});
  }

  handleRequestClose(){
    this.setState({openSnack: false});
  }

  handleChangeNumero(event, index, value){
    var error=null, disabled=false, exp="";
    var oldNumero = this.state.oldNumero;
    this.setState({numero: event.target.value});
    this.state.suites.map(function (suite){
      if(suite.numero !== oldNumero){
        exp = new RegExp("^"+suite.numero+"\\s*$","i"); 
        if(exp.test(event.target.value)){
          console.log("true");
          error='Ya existe una Habitación con este numero';
          disabled=true;
        }
      }
      if(event.target.value == "") disabled=true;
      return suite;
    }, this);

    this.setState({
      numeroValido:error, 
      disabled:disabled,
    });
  }

  handleChangeTipo (event, index, value){
    this.setState({tipo: value});
  }

  handleChangeCapacidad (event, index, value){
    this.setState({capacidad: value});
  }

  handleChangeEstado (event, index, value){
    this.setState({estado: value});
  }

  onKeypressNumero(event){
    var chr = event.key;
    var exp = /^[0-9]$/i
    console.log(chr);
    if (!exp.test(chr) && chr!=='Backspace' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift'){ 
      event.preventDefault();
    }else if(this.state.numero.length>3 && chr !== 'Backspace' && chr!=='Tab' 
                && chr!=='ArrowLeft' && chr!=='ArrowRight' && chr!=='Shift')
    {
      event.preventDefault();  
    } 
  }

  render() {
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
          title={"Editar Habitación"}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style = {{color:blue900}}>
            <hr/><br/><br/>

            <div>
              <TextField
                hintText="Numero"
                floatingLabelText="Numero"
                value={this.state.numero}
                errorText={this.state.numeroValido}
                onChange={this.handleChangeNumero}
                onKeyDown={this.onKeypressNumero}
              /><br />
              <br />
              Tipo:
              <DropDownMenu value={this.state.tipo} onChange={this.handleChangeTipo}>
                  {tipoItems}
              </DropDownMenu>
              
              Capacidad:
              <DropDownMenu value={this.state.capacidad} onChange={this.handleChangeCapacidad}>
                 {items}
              </DropDownMenu>
              
              Estado:
              <DropDownMenu value={this.state.estado} onChange={this.handleChangeEstado}>
                  <MenuItem value={"Limpia"} primaryText="Limpia" />
                  <MenuItem value={"Sucia"} primaryText="Sucia" />
              </DropDownMenu>
              <br />
            </div>

          </div> 
        </Dialog>

        <Snackbar
          open={this.state.openSnack}
          message="Habitación actualizada"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}