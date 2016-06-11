import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {blue50, cyan400} from 'material-ui/styles/colors';

const paperStyle = {
  height: 400,
  width: 400,
  top: '50%',
  left: '50%',
  marginTop:-200,
  marginLeft:-200,
  textAlign: 'center',
  display: 'inline-block',
  position:'fixed'
};

const cardHeaderStyle = {
  textAlign: 'center',
  background: blue50,
}
export default class LoginForm extends React.Component{
    /*@Constructor
      @params: props*/
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            errorUsername:null
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.validarUsuario = this.validarUsuario.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    /*@function: tests if the username's state has the needed pattern
      @params: event->value of state username
      @return: nil
    */
    validarUsuario(event){
        const username = event.target.value;
        const alphanumeric = /^[a-z0-9]+$/i;
        const usernameIsValid = alphanumeric.test(username);
        var error;

        if (usernameIsValid) {
            error = null;
        } else {
            error = 'usuario solo tiene letras y numeros.';
        }

        this.setState({ errorUsuario: error });
    }
    onUsernameChange(event, index, value){
        this.validarUsuario(event);
        this.setState( {username: event.target.value});
    }
    onPasswordChange(event, index, value){
        this.setState( {password: event.target.value});
    }
    onLoginSubmit(){
        $.ajax({
            url: "/api/usuarios/login",
            datatype: 'json',
            type: 'POST',
            async:false,
            data:{
                username: this.state.username,
                password: this.state.password
            }
        }).done(function(data){
            if(data.success === true){
                window.location ='/#/main/';
            }else{
                console.log("fallo de autenticacion");
            }
        });
    }
    componentDidMount(){
	$.ajax({
	    url: '/api/usuarios/checklogin',
	    type: 'POST',
	    cache:false,
	    async:false,
	    dataType:'json'
	    
	}).done(function (result) {
            console.log(result.sucess);
	});
	console.log(this.props.route);
    }
    render(){
        return (
                <div>
		            <AppBar
            title="Hotel Tabuba"
	    showMenuIconButton = {false}
		/>
		 <Card>

            <CardMedia>
              <img src='images/login-background/tabubaHostal.jpg' />
            </CardMedia>
		</Card>

	     <Paper style={paperStyle} zDepth={1} >
            <h3 style={{color:cyan400}}>Iniciar sesi&oacute;n</h3>
            <Divider/>
            <br/>
		<br/>
                <TextField
            hintText="Username"
            value={this.state.username}
            floatingLabelFixed={true}
            onChange={this.onUsernameChange}
            value={this.state.username}
	    errorText={this.state.errorUsername}
                />
                <br/>
                <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
                /><br />
                <FlatButton label="Login" primary={true}
            onClick={this.onLoginSubmit}
                />
		</Paper>
                </div>
        );

    }
}

export default LoginForm;
