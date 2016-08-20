import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme } from '../TabubaTheme'
import LoginComponent from './LoginComponent'


injectTapEventPlugin();


const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <LoginComponent />
  </MuiThemeProvider>
);

ReactDOM.render(<App />,
		document.getElementById('root'));
