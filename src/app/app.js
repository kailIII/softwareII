import React from 'react';
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import AppRoutes from './AppRoutes';
import Header from './components/Main'; // Our custom react component
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Crear_Usuario from './components/pages/usuarios/crear_usuario';
import Mostrar_Usuario from './components/pages/usuarios/mostrar_usuarios';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <AppRoutes />
  </MuiThemeProvider>
);

ReactDOM.render(<App />,
		document.getElementById('app'));















