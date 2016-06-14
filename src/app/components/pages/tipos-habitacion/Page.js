import React, {Component, PropTypes} from 'react';
import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import RoomTypesShow from './ShowTypes';

const muiTheme = getMuiTheme({
palette: {
accent1Color: deepOrange500,
},
});

    class RoomTypePage extends Component {

      render() {
        const {
          layoutSideBySide,
        } = this.props;


        const styles = {
          root: {
            marginBottom: 32,
          },
          exampleBlock: {
            borderRadius: '0 0 2px 0',
            padding: '14px 24px 24px',
            margin: 0,
            width: layoutSideBySide ? '80%' : null,
            float: layoutSideBySide ? 'right' : null,
          },
        };

        return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Paper style={styles.root}zDepth={5}>
            <ClearFix style={styles.exampleBlock}>
                <RoomTypesShow url="/api/tipos_habitacion/show" />
            </ClearFix>
          </Paper>
        </MuiThemeProvider>
        );
      }
    }

    export default RoomTypePage;
