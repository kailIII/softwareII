import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';

import rooms from './data/rooms';

const defaultState = {
    rooms: rooms,

    spreadsheet: {
        selection:  {
          roomIndex: -1,
          dayIndex: -1,
        },
        isSelectingDate: false,
        firstDate: new Date(2016, 7, 19),
        totalDays: 7,
    },

};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(hashHistory, store)

export default store;
