import React, { createContext } from 'react';
import { AxiosResponse } from 'axios';
import PropTypes from 'prop-types';

import api from '../services/api';
import IGroup from '../typescript/IGroup';
import IPatient, { IPagination } from '../typescript/IPatient';
import catchHandler from '../utils/catchHandler';

interface PatientContextData {
  getGroupsCall: () => Promise<IGroup[]>;
  getPatientsCall: (
    perPage: number,
    page: number,
    idGroup: string
  ) => Promise<IPagination>;
  showPatientCall: (id: string) => Promise<IPatient>;
  handleApprovePatientCall: (id: string) => Promise<string>;
}

const PatientContext = createContext<PatientContextData>(
  {} as PatientContextData
);

export const PatientProvider: React.FC = ({ children }) => {
  const getGroupsCall = async () => {
    try {
      const response: AxiosResponse<IGroup[]> = await api.get('/groups');

      return response.data;
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível listar os grupos de pacientes. Tente novamente ou contate o suporte.'
      );
      return err;
    }
  };

  const getPatientsCall = async (
    perPage: number,
    page: number,
    idGroup: string
  ) => {
    try {
      const response: AxiosResponse<IPatient[]> = await api.get(
        `/patients?per_page=${perPage}&page=${page}&idGroup=${idGroup}`
      );

      return {
        data: response.data,
        page: Number(response.headers.page),
        totalCount: Number(response.headers['total-count']),
      };
    } catch (err) {
      catchHandler(
        err,
        'Erro ao listar pacientes. Tente novamente ou contate o suporte.'
      );
      return err;
    }
  };

  const showPatientCall = async (id: string) => {
    try {
      const response: AxiosResponse<IPatient> = await api.get(`patients/${id}`);

      return response.data;
    } catch (err) {
      catchHandler(
        err,
        'Erro ao buscar dados do paciente. Tente novamente ou contate o suporte.'
      );
      return err;
    }
  };

  const handleApprovePatientCall = async (id: string) => {
    try {
      const response: AxiosResponse<{ msg: string }> = await api.patch(
        `/patients/status/${id}`,
        {
          idStatus: 2,
        }
      );

      return response.data.msg;
    } catch (err) {
      catchHandler(
        err,
        'Erro ao buscar dados do paciente. Tente novamente ou contate o suporte.'
      );
      return err;
    }
  };

  return (
    <PatientContext.Provider
      value={{
        getGroupsCall,
        getPatientsCall,
        showPatientCall,
        handleApprovePatientCall,
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
