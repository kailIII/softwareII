import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import spreadsheet from './spreadsheet'
import rooms from './rooms'
import guests from './guests'
import payments from './payments';
const rootReducer = combineReducers({rooms, guests, spreadsheet, payments, routing: routerReducer});

export default rootReducer;
