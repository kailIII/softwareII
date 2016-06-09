import React, {Component} from 'react';
import {AppBar} from 'material-ui';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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

//Componente que representa el formulario para agregar o edtiar una habitacion 
export default class Login extends React.Component{

    constructor(props) {
        super(props);
      }

    render(){
      return(

        <div>
          
          <AppBar
              title="Hotel Tabuba"
              showMenuIconButton = {false}
          />
          <Card>

            <CardMedia  
            >
              <img src='images/login-background/tabubaHostal.jpg' />
            </CardMedia>
          </Card>

          <Paper style={paperStyle} zDepth={1} >
            <h3 style={{color:cyan400}}>Iniciar sesi&oacute;n</h3>
            <Divider/>
            <br/>
            <TextField
              hintText="Usuario"
              floatingLabelText="Usuario"
            />
            <br />
            <TextField
              hintText="Contraseña"
              floatingLabelText="Contraseña"
              type="password"
            /><br />
            <br />
            <RaisedButton label="Login" primary={true} linkButton={true} href="/#/header" />
          </Paper>

      </div>
        

      )
    }

}


