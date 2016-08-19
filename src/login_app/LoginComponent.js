
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
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import request from 'superagent'

import ResizableComponent from '../app/components/ResizableComponent';
import { primaryColor } from '../TabubaTheme';

const paperStyle = {
    height: 300,
    width: 400,
    top: '50%',
    left: '50%',
    marginTop:-200,
    marginLeft:-200,
    textAlign: 'center',
    display: 'inline-block',
    position:'fixed',
};

export default class LoginComponent extends React.Component {
    /*@Constructor
      @params: props*/
    constructor(props){
        super(props);
        this.getDefaultState = this.getDefaultState.bind(this);
        this.state= this.getDefaultState()
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.validarUsuario = this.validarUsuario.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    getDefaultState(){
        return {
            username:"",
            password:"",
            errorPass:null,
            errorUsername:null,
        };
    }
    /*@function: tests if the username s state has the needed pattern
      @params: event->value of state username
      @return: nil
    */
    validarUsuario(event){
        const username = event.target.value;
        const alphanumeric = /^[a-z0-9]+$/i;
        const usernameIsValid = alphanumeric.test(username);
        let error;

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
        request.post('/api/authenticate').
          send({user: this.state.username, pass:this.state.password}).
          set('Accept', 'application/json').
          end((err, res) => {
              console.log(res.statusCode)
              if(res.statusCode === 200){
                  console.log('success')
                  window.location = '/'
                  this.setState(this.getDefaultState())
              } else
                  this.setState({errorPass: "Error al verificar credenciales"})
          })
    }

    componentDidMount(){
    }

    render(){
        return (
        <div>
          <AppBar title="Hotel Tabuba" showMenuIconButton = {false} />
          <Card>
            <CardMedia>
              <img src='/images/login-background/tabubaHostal.jpg' />
            </CardMedia>
          </Card>
          <Paper style={paperStyle} zDepth={1} >
            <h3 style={{color:primaryColor}}>Iniciar sesi&oacute;n</h3>
            <Divider/>
            <br/><br/>
            <TextField
              hintText="Username"
              value={this.state.username}
              floatingLabelFixed={true}
              onChange={this.onUsernameChange}
              value={this.state.username}
              errorText={this.state.errorUsername} />
            <br/>
            <TextField
              hintText="Password"
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange} errorText={this.state.errorPass} />
            <br /><br />
            <br />
            <RaisedButton label="Login" primary={true}
              onTouchTap={this.onLoginSubmit} />
          </Paper>
        </div>
        );

    }
}

export default LoginComponent;
