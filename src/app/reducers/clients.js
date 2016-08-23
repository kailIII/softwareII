function clients (state = [], action) {
    switch(action.type){

        case 'ADD_CLIENT':

            return [
                ...state,
                {
                    client_id: action.client_id,
                    nombre: action.nombre,
                    cedula: action.cedula,
                    nacionalidad: action.nacionalidad,
                    telefono: action.telefono,
                    email: action.email
                }
            ]

        case 'EDIT_CLIENT':
        
            return (

                state.map( function(client, i){
                    let id = client.client_id;
                  if( id == action.client_id){
                    return {...state, 
                                id, 
                                nombre: action.nombre,
                                cedula: action.cedula,
                                nacionalidad: action.nacionalidad,
                                telefono: action.telefono,
                                email: action.email
                           }
                  }

                  return client  
                })
            
            )
                
        case 'REMOVE_CLIENT':

            return (

                state.filter( function(client, i){
                    let id = client.client_id;
                  if( id != action.client_id){
                    return {...state, client}
                  }
 
                })
            
            )

        default:
            return state;
    }
}

export default clients;