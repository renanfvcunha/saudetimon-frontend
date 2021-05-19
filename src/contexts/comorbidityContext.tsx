import React, { createContext } from 'react';
import { AxiosResponse } from 'axios';
import PropTypes from 'prop-types';

import IComorbidity from '../typescript/IComorbidity';
import api from '../services/api';

interface ComorbidityContextData {
  getComorbiditiesCall: () => Promise<IComorbidity[]>;
}

const ComorbidityContext = createContext<ComorbidityContextData>(
  {} as ComorbidityContextData
);

export const ComorbidityProvider: React.FC = ({ children }) => {
  const getComorbiditiesCall = async () => {
    const response: AxiosResponse<IComorbidity[]> = await api.get(
      '/comorbidities'
    );

    return response.data;
  };

  return (
    <ComorbidityContext.Provider value={{ getComorbiditiesCall }}>
      {children}
    </ComorbidityContext.Provider>
  );
};

ComorbidityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ComorbidityContext;
