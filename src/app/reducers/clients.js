import clientes from '../data/clients'; 
var clientsArr = clientes;

function clients (state = [], action) {
    switch(action.type){

        case 'ADD_CLIENT':
            let newClient = {
                    client_id: action.client_id,
                    nombre: action.nombre,
                    cedula: action.cedula,
                    nacionalidad: action.nacionalidad,
                    telefono: action.telefono,
                    email: action.email
                }

            clientsArr.push(newClient)
            return [
                ...state,
                newClient
            ]

        case 'EDIT_CLIENT':
            
            clientsArr = clientsArr.map( function(client, i){
                    let id = client.client_id;
                  if( id == action.client_id){
                    return { 
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

            return clientsArr
                
        case 'REMOVE_CLIENT':

            clientsArr = clientsArr.filter( function(client, i){
                    let id = client.client_id;
                  if( id != action.client_id){
                    return {...state, client}
                  }
 
                })

            return clientsArr

        case 'FILTER_NAME':
            
            let exp = new RegExp("^"+action.name+".*$", "i");

            return (
                
                clientsArr.filter( function(client, i){
                    let name = client.nombre;
                  if( exp.test(name)){
                    return {...state, client}
                  }
 
                })
            
            )

        case 'FILTER_ID':
            
            let expId = new RegExp("^"+action.cedula+".*$", "i");

            return (
                
                clientsArr.filter( function(client, i){
                    let ced = client.cedula;
                  if( expId.test(ced)){
                    return {...state, client}
                  }
 
                })
            
            )               

        default:
            return state;
    }
}

export default clients;