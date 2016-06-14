import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import roomDays from './roomDays'
import rooms from './rooms'

const rootReducer = combineReducers({roomDays, rooms, routing: routerReducer});

export default rootReducer;
