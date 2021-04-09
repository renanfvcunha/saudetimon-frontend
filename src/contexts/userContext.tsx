import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { AxiosResponse } from 'axios';

import api from '../services/api';
import IUser, { IPagination } from '../typescript/IUser';

interface UserContextData {
  getUsersCall: (
    perPage: number,
    page: number,
    search: string
  ) => Promise<IPagination>;
  getUserCall: (id: string) => Promise<IUser>;
  createUserCall: (
    name: string,
    username: string,
    admin: boolean,
    password: string,
    passwordConf: string
  ) => Promise<string>;
  updateUserCall: (
    id: string,
    name: string,
    username: string,
    admin: boolean,
    password: string,
    passwordConf: string
  ) => Promise<string>;
  deleteUserCall: (id: string) => Promise<string>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const getUsersCall = async (
    perPage: number,
    page: number,
    search: string
  ) => {
    const response: AxiosResponse<IUser[]> = await api.get(
      `/users?per_page=${perPage}&page=${page}&search=${search}`
    );

    return {
      data: response.data,
      page: Number(response.headers.page),
      totalCount: Number(response.headers['total-count']),
    };
  };

  const getUserCall = async (id: string) => {
    const response: AxiosResponse<IUser> = await api.get(`/users/${id}`);

    return response.data;
  };

  const createUserCall = async (
    name: string,
    username: string,
    admin: boolean,
    password: string,
    passwordConf: string
  ) => {
    const response: AxiosResponse<{ msg: string }> = await api.post('/users', {
      name,
      username,
      admin,
      password,
      passwordConf,
    });

    return response.data.msg;
  };

  const updateUserCall = async (
    id: string,
    name: string,
    username: string,
    admin: boolean,
    password: string,
    passwordConf: string
  ) => {
    const response: AxiosResponse<{ msg: string }> = await api.put(
      `/users/${id}`,
      {
        name,
        username,
        admin,
        password,
        passwordConf,
      }
    );

    return response.data.msg;
  };

  const deleteUserCall = async (id: string) => {
    const response: AxiosResponse<{ msg: string }> = await api.delete(
      `/users/${id}`
    );

    return response.data.msg;
  };

  return (
    <UserContext.Provider
      value={{
        getUsersCall,
        getUserCall,
        createUserCall,
        updateUserCall,
        deleteUserCall,
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
