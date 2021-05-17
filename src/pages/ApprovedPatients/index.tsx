import React from 'react';

import Patients from '../../components/Patients';

const NewPatients: React.FC = () => (
  <Patients tableTitle="Lista de Pacientes Aprovados" status="Aprovado" />
);

export default NewPatients;
