import React from 'react';
import {
 Route,
 Redirect,
 IndexRoute,
} from 'react-router';

import Header from './components/Main';

const AppRoutes = (
 <Route path="/" component={Header}> </Route>);

export default AppRoutes;
