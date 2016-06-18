import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';

import rooms from './data/rooms';

import SpreadsheetStatus from '../../constants/SpreadsheetStatus'

const defaultState = {
    rooms: rooms,

    spreadsheet: {
        newReservation:  {
          roomIndex: -1,
          startIndex: -1,
          endIndex: -1,
        },
        status: SpreadsheetStatus.normal,
        firstDate: new Date(2016, 7, 19),
        totalDays: 7,
    },

};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(hashHistory, store)

export default store;
