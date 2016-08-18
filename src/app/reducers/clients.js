function clients (state = [], action) {
    switch(action.type){
        case 'ADD_CLIENT':
            return {
                ...state,
                clients: {
                    nombre: action.nombre,
                    cedula: action.cedula,
                    nacionalidad: action.nacionalidad,
                    telefono: action.telefono,
                    email: action.email,
                },
            }
        default:
            return state;
    }
}

export default clients;