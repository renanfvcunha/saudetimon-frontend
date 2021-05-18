import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NewPatients from './pages/NewPatients';
import PreApprovedPatients from './pages/PreApprovedPatients';
import DisapprovedPatients from './pages/DisapprovedPatients';
import ApprovedPatients from './pages/ApprovedPatients';
import ShowPatient from './pages/ShowPatient';
import Users from './pages/Users';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/pacientes/novos" component={NewPatients} />
    <Route path="/pacientes/pre-aprovados" component={PreApprovedPatients} />
    <Route path="/pacientes/aprovados" component={ApprovedPatients} />
    <Route path="/pacientes/negados" component={DisapprovedPatients} />
    <Route path="/pacientes/:id" component={ShowPatient} />
    <PrivateRoute path="/usuarios" component={Users} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
