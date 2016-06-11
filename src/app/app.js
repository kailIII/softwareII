import React from 'react';
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import AppRoutes from './AppRoutes';
import Header from './components/Main'; // Our custom react component
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Crear_Usuario from './components/pages/usuarios/crear_usuario';
import Mostrar_Usuario from './components/pages/usuarios/mostrar_usuarios';

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
