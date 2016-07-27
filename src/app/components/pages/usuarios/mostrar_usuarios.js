import React from 'react';
import Snackbar from 'material-ui/Snackbar';
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

const divTableStyle = {
    padding:'5%',
    background:blue50,
};

const headerTableStyle = {
    color:blue900,
    textAlign:'center'
};

var columnTableStyle ={textAlign:'center'};

export default class Mostrar_Usuario extends React.Component{

    constructor(props){
        super(props);
        this.state = {open: false,
                      usuarios: null,
                      selectedRow: -1,
                      openSnack: false,
                      mensaje:""};
        this.componentWillMount = this.componentWillMount.bind(this);
        this.onRowSelection = this.onRowSelection.bind(this);

        //metodos usados en esta clase
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onCreateEditUserSubmit = this.onCreateEditUserSubmit.bind(this);
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

        this.rightIconMenu = (
            <IconMenu iconButtonElement={this.iconButtonElement}>
                <MenuItem onTouchTap={this.handleEditOpen}>Editar</MenuItem>
                <MenuItem onTouchTap={this.handleDeleteOpen}>Eliminar</MenuItem>
                </IconMenu>
        );
    }
    handleSnackClose(){
        this.setState({openSnack: false});
    }
    onRowSelection(rowSelected){
        if(rowSelected[0] !== undefined){
            this.setState({selectedRow: rowSelected[0]});
        }
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
            cache: false,
        }).done(function (data) {
            console.log("component did mount");
            this.setState({usuarios:data});
            this.setState({openSnack:true,
                           mensaje:"Cargaron los Usuarios"});
        });
    }

    //llamar a los metodos de la clase CreateUsuarioForm mediante la propiedad ref
    handleEditOpen(){
        this.refs["create_user"].setState({username:this.state.usuarios[this.state.selectedRow].username,
                                           nombre:this.state.usuarios[this.state.selectedRow].nombre,
                                           apellido:this.state.usuarios[this.state.selectedRow].apellido,
                                           password:this.state.usuarios[this.state.selectedRow].password});
        const rol =this.state.usuarios[this.state.selectedRow].rol;
        switch(rol){
            case "ADMINISTRACION":{
                this.refs["create_user"].setState({rol:{value:1, name:"ADMINISTRACION"}});
                break;
            }
            case "SECRETARIO":{
                this.refs["create_user"].setState({rol:{value:2, name:"SECRETARIO"}});
                break;
            }
            case "CONTADOR":{
                this.refs["create_user"].setState({rol:{value:3, name:"CONTADOR"}});
                break;
            }
        }
        this.refs['create_user'].setState({id_usuario: this.state.usuarios[this.state.selectedRow].id_usuario,
        });
        this.refs['create_user'].handleEditOpen();

    }
    handleAddOpen(){
        this.refs['create_user'].setState({id_usuario: -1});
        this.refs['create_user'].handleAddOpen();
    }
    handleDeleteOpen(){
        this.setState({open: true});
        const id_usuario = this.state.usuarios[this.state.selectedRow].id_usuario;


    }
    aceptarEliminar(event){
        console.log("evento");
        const usuario = this.state.usuarios[this.state.selectedRow].usuario;
        $.ajax({
            context:this,
            url: "/api/usuarios/delete",
            dataType: 'json',
            type: 'POST',
            async:false,
            cache: false,
            data:{
                id_usuario: this.state.usuarios[this.state.selectedRow].id_usuario,
            },
        }).done(function(id_usuario) {
            if(id_usuario!== null){
                /* this.state.usuarios.filter(function (usuario_id) {
                   return usuario_id !== this.state.usuarios[this.state.selectedRow].id_usuario;
                   },this);*/
                this.setState({usuarios:this.state.usuarios.filter(function (usuario) {
                    return usuario.id_usuario !== this.state.usuarios[this.state.selectedRow].id_usuario
                },this)});
                this.setState({open: false});
                this.setState({
                    openSnack:true,
                    mensaje:"Se elimino el usuario de manera exitosa",
                });
            }else{
                console.log("No se pudo eliminar al usuario");
                this.setState({
                    openSnack:true,
                    mensaje:"No se pudo eliminar el usuario",
                });
            }
        });
    }

    cancelarEliminar(event){
        this.setState({open: false});
    }
    handleClose(){
        this.setState({open: false});
    };
    onCreateEditUserSubmit(){
        const create_user = this.refs["create_user"];
        const id_usuario = this.refs["create_user"].state.id_usuario;
        var url = '/api/usuarios/edit';
        if(this.refs["create_user"].state.username === "" || this.refs["create_user"].state.password === "" || this.refs["create_user"].state.nombre === "" || this.refs["create_user"].state.apellido === ""){
            this.setState({
                openSnack:true,
                mensaje:"No envie campos vacios.",
            });
            return;
        }
        if(id_usuario === -1){
            this.refs["create_user"].setState( {
                username: '',
                password: '',
                apellido:'',
                nombre:'',
                rol:{value:1, name:"ADMINISTRACION"},
                errorUsuario: null,
                errorNombre: null,
                errorApellido: null,
                open: false,
                modalTitle: 'Crear Usuario',
                id_usuario: -1});
            url = '/api/usuarios/create';
        }
        /*      console.log(this.state.usuarios);*/
        /*peticion ajax*/
        $.ajax({
            context:this,
            url: url,
            dataType: 'json',
            type: 'POST',
            async:false,
            cache: false,
            data:{
                id_usuario: create_user.state.id_usuario,
                username: create_user.state.username,
                password: create_user.state.password,
                apellido: create_user.state.apellido,
                nombre: create_user.state.nombre,
                rol: create_user.state.rol.name,
            },
        }).done(function (data) {
            if(data.success === true){
                const parent = this;
                if(data.create === false){
                    this.state.usuarios.map(function(usuario,i) {
                        if (usuario.id_usuario === this.refs["create_user"].state.id_usuario) {
                            usuario["username"] = this.refs["create_user"].state.username.toString();
                            usuario["password"] = this.refs["create_user"].state.password.toString();
                            usuario["apellido"] = this.refs["create_user"].state.apellido.toString();
                            usuario["nombre"] = this.refs["create_user"].state.nombre.toString();
                            usuario["rol"] = this.refs["create_user"].state.rol.name + "";
                        }
                        return usuario;

                    },this);
                    this.setState({usuarios:this.state.usuarios });
                    console.log("se pudo editar el usuario");
                    this.setState({
                        openSnack:true,
                        mensaje:"Se edito el usuario.",
                    });
                    this.refs["create_user"].setState({
                        open: false,
                    });
                    this.setState({open:false});
                }else if(data.create === true){
                    this.state.usuarios.push(data.user)
                    console.log("se pudo crear el usuario");
                    this.setState({
                        openSnack:true,
                        mensaje:"Se creo el usuario.",
                    });
                    this.refs["create_user"].setState({
                        open: false,
                    });
                }
                //console.log(this.state.usuarios);
                this.setState({open:false});
            }else{
                console.log("no se pudo editar el usuario");
                this.setState({
                    openSnack:true,
                    mensaje:"No se pudo editar el usuario.",
                    open: false,
                });

            }
        });
        this.refs["create_user"].setState({id_usuario:-1});
    }
    render() {
        var rows = [];
        console.log("render");
        console.log(this.state.usuarios);
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.cancelarEliminar.bind(this)}
            />,
            <FlatButton
                label="Aceptar"
                primary={true}
                onTouchTap={this.aceptarEliminar.bind(this)}
            />,
        ];

        return (

            <div>
                <CreateUserForm ref='create_user' url='/api/usuarios/create'  onTouchTap={this.onCreateEditUserSubmit} />
                <Dialog
                    title="Eliminar Usuario"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    Esta seguro que desea eliminar este usuario?
                </Dialog>
                <div style={divTableStyle}>
                    <Table onRowSelection={this.onRowSelection}>

                        <TableHeader
                            displaySelectAll={showCheckB}
                            adjustForCheckbox={showCheckB}
                        >
                            <TableRow>
                                <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
                                    <span style={{color: darkBlack}}><h2>Usuarios</h2></span>
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
                    <TableHeaderColumn style={headerTableStyle}>Rol</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                </TableHeader>

                <TableBody
                    displayRowCheckbox={showCheckB}>
                    {this.state.usuarios.map(function (usuario,i) {
                         return (
                             <TableRow key={i}>
                                 <TableRowColumn key={i} style={columnTableStyle}><p>{usuario.nombre}</p></TableRowColumn>
                                 <TableRowColumn key={i} style={columnTableStyle}><p>{usuario.apellido}</p></TableRowColumn>
                                 <TableRowColumn key={i} style={columnTableStyle}><p>{usuario.username}</p></TableRowColumn>
                                 <TableRowColumn key={i} style={columnTableStyle}><p>{usuario.password}</p></TableRowColumn>                                                 
                                 <TableRowColumn key={i} style={columnTableStyle}>{usuario.rol}</TableRowColumn>
                                 <TableRowColumn style={columnTableStyle}><span>{this.rightIconMenu}</span></TableRowColumn>
                            </TableRow>
                         );
                     },this)}
            </TableBody>

            </Table>
                </div>

                <Snackbar
                    open={this.state.openSnack}
                    message={this.state.mensaje}
                    autoHideDuration={2000}
                    onRequestClose={this.handleSnackClose}
                />
            </div>
        );
    }
}
