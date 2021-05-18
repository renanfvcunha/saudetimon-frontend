import React from 'react';

import Patients from '../../components/Patients';

const DisapprovedPatients: React.FC = () => (
  <Patients tableTitle="Lista de Pacientes Negados" status="Negado" />
);

export default DisapprovedPatients;
