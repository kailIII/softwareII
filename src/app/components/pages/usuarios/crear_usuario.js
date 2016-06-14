import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';


const style = {
    marginLeft: 20,
};
export default class Crear_Usuario extends React.Component{
    constructor(props) {
        super(props);
        this.state = {tipo_usuario: "",
                      password:""};
        this._handleChange = this._handleChange.bind(this);
    }
    _handleChange(event,index,value){
        console.log(event.currentTarget);
        if(value === "ADMINISTRADOR" || value=== "CONTADOR" || value ==="SECRETARIO")
            this.state.tipo_usuario = value;

        console.log(this.state);
    }
    cambioTipoUsuario(event, index, value){
        this.setState({value,
        });
        console.log(value);
        console.log(this.state);
    }

    cambioPassword(event,index,value){
        this.setState({password:value,
        });
        console.log(value);
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <Paper zDepth={2}>
                    <TextField hintText="Usuario" style={style} underlineShow={false} />
                    <Divider />
                    <br/>
                    <SelectField maxHeight={300} value={this.state.value} onChange={this._handleChange}>
                        <MenuItem value={"ADMINISTRADOR"} primaryText="ADMINISTRADOR" />
                        <MenuItem value={"SECRETARIO"} primaryText="SECRETARIO" />
                        <MenuItem value={"CONTADOR"}  primaryText="CONTADOR" />
        </SelectField>
        <Divider />
        <TextField
            hintText="Password"
            style={style}
            underlineShow={true}
            onChange={this.cambioPassword}
            //errorText="Llene este campo"
            type="password"
        />
        <Divider />
  </Paper>
  <br/>
  <RaisedButton label="Crear nuevo Usuario" style={style} />
            </div>);
    }
}
