import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Oldman from './pages/Oldman';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/oldman" component={Oldman} />
    {/* <PrivateRoute path="/users" component={Users} /> */}

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
