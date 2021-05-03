import React, { createContext } from 'react';
import { AxiosResponse } from 'axios';
import PropTypes from 'prop-types';

import api from '../services/api';
import IGroup from '../typescript/IGroup';
import IPatient, { IPagination } from '../typescript/IPatient';

interface PatientContextData {
  getGroupsCall: () => Promise<IGroup[]>;
  getPatientsCall: (
    perPage: number,
    page: number,
    idStatus: string,
    idGroup: string
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
  const getGroupsCall = async () => {
    const response: AxiosResponse<IGroup[]> = await api.get('/groups');

    return response.data;
  };

  const getPatientsCall = async (
    perPage: number,
    page: number,
    idStatus: string,
    idGroup: string
  ) => {
    const response: AxiosResponse<IPatient[]> = await api.get(
      `/patients?per_page=${perPage}&page=${page}&idStatus=${idStatus}&idGroup=${idGroup}`
    );

    return {
      data: response.data,
      page: Number(response.headers.page),
      totalCount: Number(response.headers['total-count']),
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
