import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';
import catchHandler, { Err } from '../utils/catchHandler';

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: {
    id: string;
    name: string;
    admin: boolean;
  } | null;
  signIn: (
    username: string,
    password: string,
    remember: boolean
  ) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthContextData['user'] | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (
    username: string,
    password: string,
    remember: boolean
  ) => {
    setLoading(true);

    try {
      window.history.pushState('', '', '/');

      const response = await api.post('/session', {
        username,
        password,
      });

      setUser(response.data.user);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      api.defaults.headers['Content-Type'] = 'application/json';

      if (remember) {
        localStorage.setItem(
          'SysVacina@Auth:user',
          JSON.stringify(response.data.user)
        );
        localStorage.setItem('SysVacina@Auth:token', response.data.token);
      }
    } catch (err) {
      catchHandler(
        err as Err,
        'Erro desconhecido ao fazer login. Tente novamente ou contate o suporte.'
      );

      setUser(null);
    }

    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem('SysVacina@Auth:user');
    localStorage.removeItem('SysVacina@Auth:token');

    setUser(null);
    window.history.pushState('', '', '/');
  };

  useEffect(() => {
    const storagedUser = localStorage.getItem('SysVacina@Auth:user');
    const storagedToken = localStorage.getItem('SysVacina@Auth:token');

    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }

    if (storagedToken) {
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      api.defaults.headers['Content-Type'] = 'application/json';
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
