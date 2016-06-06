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
    };
  }


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
                        rows={2}
                        />
                    <br />
                </div>
            </ClearFix>

)
    }
}
export default NewTypeSuite;
