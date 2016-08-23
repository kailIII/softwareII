const chai = require("chai")
chai.config.includeStack = true;
const expect = chai.expect;
const assert = chai.expect;
const actionCreators = require("../src/app/actions/payments")

import payments from '../src/app/data/payments';

import roomsReducer from '../src/app/reducers/rooms'
import paymentsReducer from '../src/app/reducers/payments'

const state = {
    payments: payments,
};

describe("Proceso de Realizacion de un pago", function () {
    const id_guest = "09923398713";
    const payment = 100.00
    const description = "Tarjeta de Credito"

    it("Realizar Pago",function () {
        const payments = state.payments;
        let flag_payment = false;
        const hacerPago = actionCreators.addPayment(id_guest,payment, description);
        for(let i = 0; i < payments.length; i++) {
            if(payments[i].cedula === id_guest && payments[i].description === description && parseFloat(payments[i].payment) === payment){
                flag_payment = true;
                break;
            }
        }
        expect(flag_payment).to.be.equal(false)
    })

});
