import React from 'react';

import Patients from '../../components/Patients';

const PreApprovedPatients: React.FC = () => (
  <Patients
    tableTitle="Lista de Pacientes Pré-Aprovados"
    status="Pré-Aprovado"
  />
);

export default PreApprovedPatients;
