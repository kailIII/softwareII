import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';

let defaultState

if(window.__PRELOADED_STATE__){
    defaultState = window.__PRELOADED_STATE__
    defaultState.spreadsheet.firstDate = new Date(defaultState.spreadsheet.firstDate)
}else
    defaultState = require('./data/defaultStore.js')

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(hashHistory, store)

export default store;
