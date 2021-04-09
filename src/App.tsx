import React from 'react';
import { ToastContainer } from 'react-toastify';

import Auth from './Auth';
import { AuthProvider } from './contexts/authContext';
import { PatientProvider } from './contexts/patientContext';
import { UserProvider } from './contexts/userContext';
import 'react-toastify/dist/ReactToastify.min.css';

const App: React.FC = () => (
  <AuthProvider>
    <PatientProvider>
      <UserProvider>
        <Auth />
        <ToastContainer position="top-center" />
      </UserProvider>
    </PatientProvider>
  </AuthProvider>
);

export default App;
