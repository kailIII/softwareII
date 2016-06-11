import React from 'react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, Drawer, ListItem, Dialog, FlatButton} from 'material-ui';
import {deepOrange500} from 'material-ui/styles/colors'
import Rol_Usuario from './helpers/rol_usuario';
import CreateUserForm from './create_user';
/*Icono para eliminar usuario*/
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete';
/*Icono para editar Usuario*/
import ActionsSettingsApplications from 'material-ui/svg-icons/action/settings-applications';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
const showCheckB = false;
import {grey400, grey900, blueGrey50, darkBlack, lightBlack, blue50, cyan200, blue900} from 'material-ui/styles/colors';
var divTableStyle = {
    padding:'10%',
    background:blue50

};

var headerTableStyle = {
    color:blue900
};

export default class Mostrar_Usuario extends React.Component{

    constructor(props){
        super(props);
        this.state = {open: false,
                      usuarios: null};
        this.componentWillMount = this.componentWillMount.bind(this);

        //metodos usados en esta clase
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
	this.onCreateUserSubmit = this.onCreateUserSubmit.bind(this);
        this.iconButtonElement = (
                <IconButton
            touch={true}
            tooltip="more"
            tooltipPosition="bottom-left"
                >
                <MoreVertIcon color={grey400} />
                </IconButton>
        );

        this.rightIconMenu = (
                <IconMenu iconButtonElement={this.iconButtonElement}>
                <MenuItem onTouchTap={this.handleEditOpen}>Editar</MenuItem>
                <MenuItem onTouchTap={this.handleDeleteOpen}>Eliminar</MenuItem>
                </IconMenu>
        );
    }
    componentDidMount(){
    }
    componentWillMount(){
        $.ajax({
            context:this,
            url: '/api/usuarios/getAll',
            dataType: 'json',
            type: 'POST',
            async:false,
            cache: false
        }).done(function (data) {
            console.log("component did mount");
            this.setState({usuarios:data});
        });
    }

    //llamar a los metodos de la clase CreateUsuarioForm mediante la propiedad ref
    handleEditOpen(){
        this.refs['create_user'].handleEditOpen();
    }
    handleAddOpen(){
        this.refs['create_user'].handleAddOpen();
    }
    handleDeleteOpen(){
        this.setState({open: true});
    }
    handleClose(){
        this.setState({open: false});
    };
    onCreateUserSubmit(){
	var create_user = this.refs["create_user"];
	   
        /*peticion ajax*/
        $.ajax({
	    context:this,
            url: create_user.props.url,
            dataType: 'json',
            type: 'POST',
            async:false,
            cache: false,
            data:{
                username: create_user.state.username,
                password: create_user.state.password,
                apellido: create_user.state.apellido,
                nombre: create_user.state.nombre,
                rol: create_user.state.rol.name
            }
        }).done(function (data) {
	    console.log(data);
            if(data.success === true){
		//data.user = JSON.parse(data.user);
		console.log(typeof(data.user));
		this.setState({suarios:this.state.usuarios.push(data.user)});
		                console.log(" creado el usuario");
		console.log(this.state.usuarios);
            }else{
                console.log("no se pudo crear el usuario");
            }
        });
	
    }
    render() {
        console.log("render");
        var rows = [];
        const actions = [
                <FlatButton
            label="Cancelar"
            primary={true}
            onTouchTap={this.handleClose}
                />,
                <FlatButton
            label="Aceptar"
            primary={true}
            onTouchTap={this.handleClose}
                />,
        ];

        return (

                <div>
                <CreateUserForm ref='create_user' url='/api/usuarios/create'  onTouchTap={this.onCreateUserSubmit}/>
                <Dialog
            title="Eliminar Usuario"
            actions={actions}
            modal={true}
            open={this.state.open}
                >
                Esta seguro que desea eliminar este usuario?
                </Dialog>
                <div style={divTableStyle}>
                <Table >

                <TableHeader
            displaySelectAll={showCheckB}
            adjustForCheckbox={showCheckB}
                >
                <TableRow>
                <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                <span style={{color: darkBlack}}><h3>Usuarios</h3></span>
                </TableHeaderColumn>
                <TableHeaderColumn colSpan="1" tooltip="Agregar Usuario" style={{textAlign: 'center'}}>
                <span ><FloatingActionButton mini={true} onTouchTap={this.handleAddOpen}>
                <ContentAdd />
                </FloatingActionButton>
                </span>
                </TableHeaderColumn>
                </TableRow>
                <TableRow>
                <TableHeaderColumn style={headerTableStyle}>Nombre</TableHeaderColumn>
                <TableHeaderColumn style={headerTableStyle}>Apellido</TableHeaderColumn>
                <TableHeaderColumn style={headerTableStyle}>Usuario</TableHeaderColumn>
                <TableHeaderColumn style={headerTableStyle}>Password</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                </TableHeader>

                <TableBody
            displayRowCheckbox={showCheckB}>
                {this.state.usuarios.map(function (usuario,i) {
                    return (
                            <TableRow key={i}>
                            <TableRowColumn key={i}>{usuario.nombre}</TableRowColumn>
                            <TableRowColumn key={i}>{usuario.apellido}</TableRowColumn>
                            <TableRowColumn key={i}>{usuario.username}</TableRowColumn>
                            <TableRowColumn key={i}>{usuario.password}</TableRowColumn>
			                      <TableRowColumn><span>{this.rightIconMenu}</span></TableRowColumn>
                            </TableRow>
                    );
                },this)}
            </TableBody>

            </Table>
                </div>
                </div>
        );
    }
}
