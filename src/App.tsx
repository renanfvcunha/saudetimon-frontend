import React from 'react';
import { ToastContainer } from 'react-toastify';

import Auth from './Auth';
import { AuthProvider } from './contexts/authContext';
import 'react-toastify/dist/ReactToastify.min.css';

const App: React.FC = () => (
  <AuthProvider>
    <Auth />
    <ToastContainer position="top-center" />
  </AuthProvider>
);

export default App;
