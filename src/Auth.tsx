import React, { useContext } from 'react';

import AuthContext from './contexts/authContext';
import Menu from './components/Menu';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';

const Auth: React.FC = () => {
  const { signed } = useContext(AuthContext);

  if (window.location.pathname === '/politica-de-privacidade') {
    return <PrivacyPolicy />;
  }

  if (!signed) {
    return <Login />;
  }

  return <Menu />;
};

export default Auth;
