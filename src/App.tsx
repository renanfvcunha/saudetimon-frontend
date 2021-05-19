import React, { JSXElementConstructor, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import Auth from './Auth';
import { AuthProvider } from './contexts/authContext';
import { PatientProvider } from './contexts/patientContext';
import { UserProvider } from './contexts/userContext';
import 'react-toastify/dist/ReactToastify.min.css';

interface Props {
  components: JSXElementConstructor<PropsWithChildren<unknown>>[];
  children: React.ReactNode;
}

const App: React.FC = () => {
  const Compose = (props: Props) => {
    const { components = [], children } = props;

    return (
      <>
        {components.reduceRight(
          (acc, Comp) => (
            <Comp>{acc}</Comp>
          ),
          children
        )}
      </>
    );
  };

  return (
    <Compose components={[AuthProvider, PatientProvider, UserProvider]}>
      <Auth />
      <ToastContainer position="top-center" />
    </Compose>
  );
};

export default App;
