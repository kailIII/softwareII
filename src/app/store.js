import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';

import rooms from './data/rooms';

const defaultState = {
    rooms: rooms,
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(hashHistory, store)

export default store;
