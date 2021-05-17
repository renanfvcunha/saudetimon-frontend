import React, { createContext } from 'react';
import { AxiosResponse } from 'axios';
import PropTypes from 'prop-types';

import api from '../services/api';
import IGroup from '../typescript/IGroup';
import IPatient, { IPagination } from '../typescript/IPatient';
import ICategory from '../typescript/ICategory';

interface PatientContextData {
  getCategoriesCall: () => Promise<ICategory[]>;
  getGroupsCall: (idCategory?: string) => Promise<IGroup[]>;
  getPatientsCall: (
    perPage?: string,
    page?: string,
    status?: string,
    idCategory?: string,
    idGroup?: string,
    vaccinated?: string
  ) => Promise<IPagination>;
  showPatientCall: (id: string) => Promise<IPatient>;
  handleApprovePatientCall: (id: string) => Promise<string>;
  handleDisapprovePatientCall: (id: string, message: string) => Promise<string>;
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

  const handleApprovePatientCall = async (id: string) => {
    const response: AxiosResponse<{ msg: string }> = await api.patch(
      `/patients/status/${id}`,
      {
        idStatus: 2,
      }
    );

    return response.data.msg;
  };

  const handleDisapprovePatientCall = async (id: string, message: string) => {
    const response: AxiosResponse<{ msg: string }> = await api.patch(
      `/patients/status/${id}`,
      {
        idStatus: 3,
        message,
      }
    );

    return response.data.msg;
  };

  const markAsVaccinatedCall = async (id: string) => {
    const response: AxiosResponse<{ msg: string }> = await api.patch(
      `/markasvaccinated/${id}`
    );

    return response.data.msg;
  };

  return (
    <PatientContext.Provider
      value={{
        getCategoriesCall,
        getGroupsCall,
        getPatientsCall,
        showPatientCall,
        handleApprovePatientCall,
        handleDisapprovePatientCall,
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
