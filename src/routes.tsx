import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    {/* <PrivateRoute path="/users" component={Users} /> */}

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
