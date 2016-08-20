import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRoutes from './AppRoutes';
import { muiTheme } from '../TabubaTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppRoutes />
  </MuiThemeProvider>
);

ReactDOM.render(<App />,
		document.getElementById('root'));
