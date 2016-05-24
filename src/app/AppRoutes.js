import React from 'react';
import {
    Route,
    Redirect,
    IndexRoute,
} from 'react-router';
import Header from './components/Main';
//import Home from './components/pages/home';
/*MANEJO DE USUARIOS DEL SISTEMA*/
import Mostrar_Usuarios from './components/pages/usuarios/mostrar_usuarios';
import Crear_Usuario from './components/pages/usuarios/crear_usuario';
import Editar_Usuario from './components/pages/usuarios/editar_usuario';


const AppRoutes = (
        <Route path="/" component={Header} >
        <Redirect from="usuario" to="/usuario/crear" />
        <Route path="usuario" component={Mostrar_Usuarios}>
        <Route path="crear" component={Crear_Usuario}/>
        <Route path="editar" component={Editar_Usuario}/>
        </Route>
        </Route>
);


export default AppRoutes;
