import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';

import rooms from './data/rooms';
import guests from './data/guests';
import reservations from './data/reservations';

import SpreadsheetStatus from '../../constants/SpreadsheetStatus'
const today = new Date()
const defaultState = {
    rooms: rooms,
    guests: guests,
    reservations: {
        values: reservations,
        suggestions: [],
    },
    spreadsheet: {
        snackMessage: '',
        status: SpreadsheetStatus.normal,
        firstDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
        totalDays: 12,
    },

};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(hashHistory, store)

export default store;
