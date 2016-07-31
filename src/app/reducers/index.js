import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import spreadsheet from './spreadsheet'
import rooms from './rooms'
import guests from './guests'
import payments from './payments';
import clients from './clients';
import reservations from './reservations'

const rootReducer = combineReducers({rooms, guests, reservations, spreadsheet,
  payments, clients, routing: routerReducer});

export default rootReducer;
