import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRoutes from './AppRoutes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

{/* declarar theme en una variable para customizarlo */}
const myTheme = getMuiTheme({
    palette: {
        primary1Color: cyan500,
    },
});

const App = () => (
  <MuiThemeProvider muiTheme={myTheme}>
    <AppRoutes />
  </MuiThemeProvider>
);

ReactDOM.render(<App />,
		document.getElementById('root'));
