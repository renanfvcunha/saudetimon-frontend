import React, { ComponentType, useContext } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthContext from '../../contexts/authContext';
import NotAdmin from '../../pages/NotAdmin';

interface PrivateRouteProps extends RouteProps {
  component: ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route {...rest} component={user && user.admin ? component : NotAdmin} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
