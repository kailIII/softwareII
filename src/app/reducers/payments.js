function payments (state = [], action) {
    switch(action.type){
        case 'ADD_PAYMENT':
            let new_payment = {cedula: action.id_guest,
                               valor: action.payment,
                               description: action.description};
            console.log("pago: " + new_payment);
            console.log(state);
            return [
                ...state,
                new_payment,
            ]
        default:
            return state;
    }
}

export default payments;
