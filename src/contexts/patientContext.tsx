import React, { createContext } from 'react';
import { AxiosResponse } from 'axios';
import PropTypes from 'prop-types';

import api from '../services/api';
import IGroup from '../typescript/IGroup';
import IPatient, { IPagination } from '../typescript/IPatient';
import ICategory from '../typescript/ICategory';
import IStatus from '../typescript/IStatus';

interface PatientContextData {
  getCategoriesCall: () => Promise<ICategory[]>;
  getGroupsCall: (idCategory?: string) => Promise<IGroup[]>;
  getStatusCall: () => Promise<IStatus[]>;
  getPatientsCall: (
    perPage?: string,
    page?: string,
    status?: string,
    idCategory?: string,
    idGroup?: string,
    vaccinated?: string
  ) => Promise<IPagination>;
  showPatientCall: (id: string) => Promise<IPatient>;
  handleChangePatientStatusCall: (
    id: string,
    idStatus: string,
    message: string | null
  ) => Promise<string>;
  handleChangePatientGroupCall: (
    id: string,
    idGroup: string
  ) => Promise<string>;
  markAsVaccinatedCall: (id: string) => Promise<string>;
}

const PatientContext = createContext<PatientContextData>(
  {} as PatientContextData
);

export const PatientProvider: React.FC = ({ children }) => {
  const getCategoriesCall = async () => {
    const response: AxiosResponse<ICategory[]> = await api.get('/categories');

    return response.data;
  };

  const getGroupsCall = async (idCategory?: string) => {
    const response: AxiosResponse<IGroup[]> = await api.get(
      `/groups?idCategory=${idCategory || ''}`
    );

    return response.data;
  };

  const getStatusCall = async () => {
    const response: AxiosResponse<IStatus[]> = await api.get('/status');

    return response.data;
  };

  const getPatientsCall = async (
    perPage?: string,
    page?: string,
    status?: string,
    idCategory?: string,
    idGroup?: string,
    vaccinated?: string
  ) => {
    const response: AxiosResponse<[IPatient[], number]> = await api.get(
      `/patients?per_page=${perPage || ''}&page=${page || ''}&status=${
        status || ''
      }&idCategory=${idCategory || ''}&idGroup=${idGroup || ''}&vaccinated=${
        vaccinated || ''
      }`
    );

    return {
      data: response.data[0],
      totalCount: response.data[1],
    };
  };

  const showPatientCall = async (id: string) => {
    const response: AxiosResponse<IPatient> = await api.get(`patients/${id}`);

    return response.data;
  };

  const handleChangePatientStatusCall = async (
    id: string,
    idStatus: string,
    message: string | null
  ) => {
    const response: AxiosResponse<{ msg: string }> = await api.patch(
      `/patients/${id}/status`,
      {
        idStatus,
        message,
      }
    );

    return response.data.msg;
  };

  const handleChangePatientGroupCall = async (id: string, idGroup: string) => {
    const response: AxiosResponse<{ msg: string }> = await api.patch(
      `/patients/${id}/group`,
      {
        idGroup,
      }
    );

    return response.data.msg;
  };

  const markAsVaccinatedCall = async (id: string) => {
    const response: AxiosResponse<{ msg: string }> = await api.patch(
      `/patients/${id}/markasvaccinated`
    );

    return response.data.msg;
  };

  return (
    <PatientContext.Provider
      value={{
        getCategoriesCall,
        getGroupsCall,
        getStatusCall,
        getPatientsCall,
        showPatientCall,
        handleChangePatientStatusCall,
        handleChangePatientGroupCall,
        markAsVaccinatedCall,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

PatientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PatientContext;
