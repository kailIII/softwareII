import React, {Component} from 'react';
import {Dialog, FlatButton, RaisedButton} from 'material-ui';
import Subheader from 'material-ui/Subheader';
import {grey400, grey900, blueGrey50, darkBlack, lightBlack, blue50, cyan200, blue900} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';

import AddSuiteModal from './AddSuite';
import EditSuiteModal from './EditSuite';

const showCheckB = false;
var divTableStyle = {
  padding:'5%',
  background:blue50
};

var headerTableStyle = {
  color:blue900,
  textAlign:'center'
};

var columnTableStyle ={textAlign:'center'};

export default class Suites extends Component {

  constructor(props){
    super(props);

    this.state = {
      open: false, 
      suites: undefined, 
      currentSuite:undefined,
      openSnack: false,
    };

    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleAddOpen = this.handleAddOpen.bind(this);
    this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAddSuite = this.handleAddSuite.bind(this);
    this.handleEditSuite = this.handleEditSuite.bind(this);
    this.handleDeleteSuite = this.handleDeleteSuite.bind(this);
    this.handleSnackClose = this.handleSnackClose.bind(this);

    this.iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

  }
  
  handleEditOpen(suite){
    var editSuite = this.refs['EditSuite'];
    this.setState({currentSuite: suite}); 
    editSuite.setState({
      numero: suite.numero,
      tipo:suite.tipo,
      capacidad:suite.capacidad,
      estado:suite.estado,
      oldNumero:suite.numero
    });
    editSuite.handleEditOpen();
  }

  handleAddOpen(){
    this.refs['AddSuite'].handleAddOpen();
  }

  handleDeleteOpen(suite){
    this.setState({open: true, currentSuite: suite});
  }

  handleClose(){
    this.setState({open: false});
    
  };

  componentWillMount(){
    $.ajax({
            context: this,
            url: '/api/habitaciones/getSuites',
            dataType: 'json',
            type: 'POST',
            async:false,
            cache: false,
        }).done(function (data) {
           if(data.success !== false){
            this.setState({suites: data.suites});
           }else
            console.log("no se pudo obtener habitaciones"); 
        });
  };

  componentDidMount(){
    var addSuite = this.refs["AddSuite"];
    var editSuite = this.refs["EditSuite"];
    addSuite.setState({suites: this.state.suites});
    editSuite.setState({suites: this.state.suites});
  }

  handleAddSuite(){
    var addSuite = this.refs["AddSuite"];
    $.ajax({
            context: this,
            url: '/api/habitaciones/create',
            dataType: 'json',
            type: 'POST',
            async: false,
            cache: false,
            data:{
                numeroHabitacion: addSuite.state.numero,
                tipoHabitacion: addSuite.state.tipo,
                capacidad: addSuite.state.capacidad,
                estado: addSuite.state.estado,
            }
        }).done(function (data) {
            if(data.success === true){
                this.state.suites.push(data.suite[0]);
                this.setState({suites:this.state.suites});
                addSuite.setState({
                  open:false, 
                  openSnack: true,
                  suites:this.state.suites
                });
            }else{
                console.log("no se pudo crear el usuario");
            }
        });
  }

  handleEditSuite(){
    var editSuite = this.refs["EditSuite"];
    $.ajax({
            context: this,
            url: '/api/habitaciones/update',
            dataType: 'json',
            type: 'POST',
            async: false,
            cache: false,
            data:{
                suiteId: this.state.currentSuite.id_habitacion,
                numeroHabitacion: editSuite.state.numero,
                tipoHabitacion: editSuite.state.tipo,
                capacidad: editSuite.state.capacidad,
                estado: editSuite.state.estado
            }
        }).done(function (data) {
            if(data.success == true){

                this.state.suites.map( function (suite){
                  if(suite.id_habitacion === this.state.currentSuite.id_habitacion){
                    suite.numero = data.suite[0].numero;
                    suite.tipo = data.suite[0].tipo;
                    suite.estado = data.suite[0].estado;
                    suite.capacidad = data.suite[0].capacidad;
                  }
                  return suite;
                }, this);

                this.setState({suites:this.state.suites});
                editSuite.setState({
                  open:false, 
                  openSnack: true,
                  suites:this.state.suites
                });
            }else{
                console.log("no se pudo editar el usuario");
            }
        });
  }

  handleDeleteSuite(){
    var addSuite = this.refs["AddSuite"];
    var editSuite = this.refs["EditSuite"];
    $.ajax({
            context: this,
            url: '/api/habitaciones/delete',
            dataType: 'json',
            type: 'POST',
            async: false,
            cache: false,
            data:{
                suiteId: this.state.currentSuite.id_habitacion         }
        }).done(function (data) {
            if(data.success == true){

               var habs = this.state.suites.filter(function (suite){
                  return suite.id_habitacion !== this.state.currentSuite.id_habitacion;
               }, this);
               this.setState({open: false, openSnack: true, suites:habs});
               addSuite.setState({suites:habs});
               editSuite.setState({suites:habs});
            }else{
                console.log("no se pudo eliminar");
            }
        });
  }

  handleSnackClose(){
    this.setState({openSnack: false});
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Aceptar"
        primary={true}
        onTouchTap={this.handleDeleteSuite}
      />,
    ];

    return (
         
          <div>
            <AddSuiteModal ref="AddSuite" onTouchTap={this.handleAddSuite}/>
            <EditSuiteModal ref="EditSuite" onTouchTap={this.handleEditSuite}/>
            <Dialog
              title="Eliminar Habitación"
              actions={actions}
              modal={true}
              open={this.state.open}
            >
              Esta seguro que desea eliminar esta Habitación?
            </Dialog>
            <div style={divTableStyle}>
             <Table >
              
              <TableHeader
                displaySelectAll={showCheckB}
                adjustForCheckbox={showCheckB}
              >
                <TableRow>
                  <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                    <span style={{color: darkBlack}}><h2>Habitaciones</h2></span>
                  </TableHeaderColumn>
                  <TableHeaderColumn colSpan="1" tooltip="Agregar Habitación" style={{textAlign: 'center'}}>
                    <span ><FloatingActionButton mini={true} onTouchTap={this.handleAddOpen}>
                            <ContentAdd />
                          </FloatingActionButton>
                    </span>
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn style={headerTableStyle}>Numero</TableHeaderColumn>
                  <TableHeaderColumn style={headerTableStyle}>Tipo</TableHeaderColumn>
                  <TableHeaderColumn style={headerTableStyle}>Capacidad</TableHeaderColumn>
                  <TableHeaderColumn style={headerTableStyle}>Estado</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody
                displayRowCheckbox={showCheckB}
                >
                { 
                  this.state.suites.map(function (suite,i){
                  return (
                      <TableRow key={i}>
                      <TableRowColumn key={i} style={columnTableStyle}>{suite.numero} </TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{suite.tipo}</TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{suite.capacidad}</TableRowColumn>
                      <TableRowColumn key={i} style={columnTableStyle}>{suite.estado}</TableRowColumn>
                      <TableRowColumn style={columnTableStyle}>
                        <span>
                        {
                          (<IconMenu iconButtonElement={this.iconButtonElement}>
                            <MenuItem onTouchTap={this.handleEditOpen.bind(this,suite)}>Editar</MenuItem>
                            <MenuItem onTouchTap={this.handleDeleteOpen.bind(this,suite)}>Eliminar</MenuItem>
                          </IconMenu>)
                        }
                        </span>
                      </TableRowColumn>
                      </TableRow>
                    );
                }, this)}
              </TableBody>

            </Table>

            <Snackbar
              open={this.state.openSnack}
              message="Habitación Eliminada"
              autoHideDuration={4000}
              onRequestClose={this.handleSnackClose}
            />

          </div>

        </div>
    );
  }
}
