import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import spreadsheet from './spreadsheet'
import rooms from './rooms'
import guests from './guests'
import reservations from './reservations'

const rootReducer = combineReducers({rooms, guests, reservations, spreadsheet,
  routing: routerReducer});

export default rootReducer;
