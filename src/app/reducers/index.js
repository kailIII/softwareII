import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import spreadsheet from './spreadsheet'
import rooms from './rooms'
import guests from './guests'

const rootReducer = combineReducers({rooms, guests, spreadsheet, routing: routerReducer});

export default rootReducer;
