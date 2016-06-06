import React from 'react';
import {
    Route,
    Router,
    hashHistory,
} from 'react-router';
import Header from './components/Main';
//import Home from './components/pages/home';
/*MANEJO DE USUARIOS DEL SISTEMA*/
import Mostrar_Usuarios from './components/pages/usuarios/mostrar_usuarios';
import Crear_Usuario from './components/pages/usuarios/crear_usuario';
import Editar_Usuario from './components/pages/usuarios/editar_usuario';
import RoomTypesShow from './components/pages/tipos-habitacion/Page'


export default React.createClass ({
    render(){
        return (
            <Router history={hashHistory}>
              <Route path="/" component={Header} >
                  <Route path="/usuario" component={Mostrar_Usuarios}/>
                  <Route path="/usuario/crear" component={Crear_Usuario}/>
                  <Route path="/usuario/editar" component={Editar_Usuario}/>
                  <Route path="/tipo-habitacion" component={RoomTypesShow}/>
              </Route>
            </Router>)
    },
});


