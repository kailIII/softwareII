/*
 * actionCreator: add a new payment to a guest in the hotel
   @params: id_guest, payment, description ->(string, double, string
 */
export function addPayment(id_guest,payment, description) {
    return {
        type: "ADD_PAYMENT",
        id_guest: id_guest,
        payment: payment,
        description: description,
    }
}

/*
 * actionCreator: add a new payment to a guest in the hotel
   @params: id_guest, payment,description ->(int, double, description)
 */
export function removePayment(id_guest,payment, description) {
    return {
        type: "REMOVE_PAYMENT",
        id_guest: id_guest,
        payment: payment,
        description: description,
    }
}
