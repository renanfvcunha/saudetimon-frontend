import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Patients from './pages/NewPatients';
import ShowPatient from './pages/ShowPatient';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/patients/new" component={Patients} />
    <Route path="/patients/:id" component={ShowPatient} />
    {/* <PrivateRoute path="/users" component={Users} /> */}

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
