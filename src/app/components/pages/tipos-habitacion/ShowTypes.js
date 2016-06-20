'use strict';
import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewTypeSuite from './Create-Suite-Type';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 525,
    overflowY: 'auto',
    marginBottom: 5,
  },
  floatActionButton:{
      marginRight: 20,
  },
  buttons:{
      margin: 12,
  },
};

export default class RoomTypesShow extends React.Component{

    constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSnackBar:false,
      tipos:[],
      title: '',
	  description:'',
	  idSelectedTile:-1
    };
    this.handleAddOpen = this.handleAddOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.onTileSelected = this.onTileSelected.bind(this);
	this.onCreateEditTypeSubmit = this.onCreateEditTypeSubmit.bind(this);
	this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      cache: false,
      success: function(data) {
          console.log(data);
        this.setState({tipos: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  onTileSelected(tileId, titulo, descripcion){
    console.log("IMPRIMIENDO TILE");
    console.log(tileId);
    console.log(titulo);
    console.log(descripcion);
    this.setState({idSelectedTile: tileId, title: titulo, description:descripcion});
  }
  handleEditOpen() {
    this.refs['AddSuiteType'].handleEditOpen();
	this.refs['AddSuiteType'].setState({idSelectedTile: this.state.idSelectedTile, title: this.state.title, description:this.state.description});
  }

  handleRequestClose() {
  this.setState({
    openSnackBar: false,
  });
}
    handleAddOpen () {
	  this.refs["AddSuiteType"].setState({idSelectedTile:-1, title:'', description: ''})
      this.refs['AddSuiteType'].handleAddOpen();
    }

    handleClose  ()  {
      this.refs['AddSuiteType'].handleClose();
    }

	handleDeleteOpen(){
        this.setState({open: true});
    }

	cancelarEliminar(event){
        this.setState({open: false});
    }

	onCreateEditTypeSubmit(){
		const SuiteType = this.refs["AddSuiteType"];
		const id_tile = SuiteType.state.idSelectedTile;
		const url = "/api/tipos_habitacion/save";
		$.ajax({
		context: this,
        url: url,
        dataType: 'json',
        type: 'POST',
        cache: false,
        data: {title:SuiteType.state.title, description: SuiteType.state.description, id: id_tile},
        success: function(data) {
		  const parent = this;
		  if(data.create === false){
			  console.log("mostrando id habitacion tipo seleccionado: ")
			  console.log(this.refs["AddSuiteType"].state.idSelectedTile)
			  this.state.tipos.map(function(tipoHab,i) {
				//   console.log(tipoHab.id_habitacion_tipo)
				  if (tipoHab.id_habitacion_tipo === this.refs["AddSuiteType"].state.idSelectedTile) {
					//   console.log(tipoHab)
					  tipoHab["tipo"] = this.refs["AddSuiteType"].state.title.toString();
					  tipoHab["descripcion"] = this.refs["AddSuiteType"].state.description.toString();
				  }
				  return tipoHab;

			  },this);
			  this.setState({ openSnackBar: true, tipos:this.state.tipos });
			  SuiteType.handleClose();
			  console.log("se pudo editar el tipo");
		  }else if(data.create === true){
			  this.state.tipos.push(data.tipo)
			  console.log("se pudo crear el nuevo tipo de habitacion");
			  this.setState({openSnackBar: true});
			  SuiteType.handleClose();
		  }
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(url, status, err.toString());
        }.bind(this)
	}).then(
	  this.refs["AddSuiteType"].setState({idSelectedTile:-1, title:'', description: ''})
  );
	}
	aceptarEliminar(event){
		console.log("acepto eliminar");
		let idType = this.state.idSelectedTile;
		$.ajax({
            context:this,
            url: "/api/tipos_habitacion/delete",
            dataType: 'json',
            type: 'POST',
            async:false,
            cache: false,
            data:{
                id: idType,
            },
        }).done(function(idTypeDeleted) {
            if(idTypeDeleted!== null){
				let filteredTypes = this.state.tipos.filter(function (tipo) {
					console.log(tipo.id_habitacion_tipo);
					console.log(this.state.idSelectedTile);
                    return tipo.id_habitacion_tipo !== this.state.idSelectedTile
                },this);
				console.log(filteredTypes)
                this.setState({tipos:filteredTypes});
                this.setState({open: false});
            }else{
                console.log("No se pudo eliminar al tipo de habitacion");
            }
        });
	}

render(){
	const actions = [
		<RaisedButton
			label="Cancelar"
			backgroundColor="#c4c4c4"
			style={styles.buttons}
			onTouchTap={this.cancelarEliminar.bind(this)}
		/>,
		<RaisedButton
			label="Aceptar"
			backgroundColor="#ffef62"
			style={styles.buttons}
			onTouchTap={this.aceptarEliminar.bind(this)}
		/>,
	];
return(
    <div>
  <div style={styles.root}>
      <Subheader>Tipos de Suite</Subheader>
    <GridList
      cellHeight={200}
      cols={1}
      style={styles.gridList}
    >

      {this.state.tipos.map((tile, i) => (
        <GridTile
          key={tile.id_habitacion_tipo}
          title={tile.tipo}
          subtitle={<span>{tile.descripcion}</span>}
          onTouchTap={this.onTileSelected.bind(this,tile.id_habitacion_tipo, tile.tipo, tile.descripcion)}
          actionIcon={
              <IconMenu
                  iconButtonElement={
                      <IconButton>
                          <MoreVertIcon color="white"/>
                    </IconButton>
                }
              >
                <MenuItem primaryText="Editar" onTouchTap={this.handleEditOpen} />
                <MenuItem primaryText="Eliminar" onTouchTap={this.handleDeleteOpen} />
                </IconMenu>
      }>
          <img src={tile.ruta_foto} />
        </GridTile>
      ))}
    </GridList>

  </div>
  <FloatingActionButton onTouchTap={this.handleAddOpen} mini={true} style={styles.floatActionButton}>
        <ContentAdd />
    </FloatingActionButton>
          <NewTypeSuite
		   ref="AddSuiteType"
		   onTouchTap={this.onCreateEditTypeSubmit}
		   />
		   <Dialog
   			title="Eliminar Tipo Habitación"
   			actions={actions}
   			modal={true}
   			open={this.state.open}
   >
   			Esta seguro que desea eliminar este tipo de habitación?
   		</Dialog>
        <Snackbar
            open={this.state.openSnackBar}
            message="Tipo de Habitación Guardado"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            />
  </div>
)
}

};

export default RoomTypesShow;
