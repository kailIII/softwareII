import React, {Component} from 'react';
import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';


const muiTheme = getMuiTheme({
palette: {
accent1Color: deepOrange500,
},
});
export default class NewTypeSuite extends React.Component {
    constructor(props,context) {
    super(props);
    this.state = {
      open: false,
      title: '',
      description: '',
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }
  handleClose  ()  {
      this.setState({open: false});
    };
  onTitleChange(event){
  this.setState({title:event.target.value});
    };
    onDescriptionChange(event){
    this.setState({description:event.target.value});
    };
    handleTouchTap (){
      $.ajax({
      url: this.props.urlSave,
      dataType: 'json',
      type: 'POST',
      cache: false,
      data: {title:this.state.title, description: this.state.description},
      success: function(data) {
        this.setState({
            openSnackBar: true,
            data: data,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
};

    render() {

        const {
          layoutSideBySide,
        } = this.props;

        const styles = {
            group: {

        width: '100%',
        marginTop: '25px',
        padding: '0 5px',
        boxSizing: 'border-box',
      },
      container: {
        marginBottom: '2px',
        minHeight: '10px',
        textAlign: 'left',
      },
          root: {
              display: 'flex',
              justifyContent: 'space-around',
              width: 400,
          },
          exampleBlock: {
            borderRadius: '0 0 2px 0',
            padding: '14px 24px 24px',
            margin: 0,
            width: layoutSideBySide ? '80%' : null,
            float: layoutSideBySide ? 'right' : null,
          },
          buttons:{
              margin: 12,
          },

        };

        return (

            <ClearFix style={styles.exampleBlock}>
                <div>
                    <TextField
                        floatingLabelText="Nombre de la Suite"
                        onChange= {this.onTitleChange}
                        />
                    <br />
                    <div style={styles.group}>
                        <div style={styles.container}>
                            <Checkbox
                                name="checkboxName1"
                                value="checkboxValue1"
                                label="Camas Separables"
                                />
                        </div>
                    </div>
                    <TextField
                        hintText="Descripción"
                        floatingLabelText="Descripción de la Habitación"
                        multiLine={true}
                        onChange={this.onDescriptionChange}
                        rows={2}
                        />
                    <br />
                          <RaisedButton
          label="Guardar"
          onTouchTap={this.handleTouchTap}
          backgroundColor="#add580"
          style={styles.buttons}
          />,
      <RaisedButton
          label="Atrás"
          style={styles.buttons}
          onTouchTap={this.handleClose}
          />
                </div>
            </ClearFix>

)
    }
}
export default NewTypeSuite;
