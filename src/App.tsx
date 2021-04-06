import React from 'react';
import { ToastContainer } from 'react-toastify';

import Auth from './Auth';
import { AuthProvider } from './contexts/authContext';
import { PatientProvider } from './contexts/patientContext';
import 'react-toastify/dist/ReactToastify.min.css';

const App: React.FC = () => (
  <AuthProvider>
    <PatientProvider>
      <Auth />
      <ToastContainer position="top-center" />
    </PatientProvider>
  </AuthProvider>
);

export default App;
