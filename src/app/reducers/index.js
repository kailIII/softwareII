import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import spreadsheet from './spreadsheet'
import rooms from './rooms'

const rootReducer = combineReducers({rooms, spreadsheet, routing: routerReducer});

export default rootReducer;
