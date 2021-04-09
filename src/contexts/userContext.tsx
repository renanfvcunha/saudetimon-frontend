import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { AxiosResponse } from 'axios';

import api from '../services/api';
import catchHandler from '../utils/catchHandler';
import IUser, { IPagination } from '../typescript/IUser';

interface UserContextData {
  getUsersCall: (perPage: number, page: number) => Promise<IPagination>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const getUsersCall = async (perPage: number, page: number) => {
    try {
      const response: AxiosResponse<IUser[]> = await api.get(
        `/users?per_page=${perPage}&page=${page}`
      );

      return {
        data: response.data,
        page: Number(response.headers.page),
        totalCount: Number(response.headers['total-count']),
      };
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível listar os grupos de pacientes. Tente novamente ou contate o suporte.'
      );
      return err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        getUsersCall,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
