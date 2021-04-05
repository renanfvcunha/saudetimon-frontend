import React, { useContext } from 'react';

import AuthContext from './contexts/authContext';
import Menu from './components/Menu';
import Login from './pages/Login';

const Auth: React.FC = () => {
  const { signed } = useContext(AuthContext);

  if (!signed) {
    return <Login />;
  }

  return <Menu />;
};

export default Auth;
