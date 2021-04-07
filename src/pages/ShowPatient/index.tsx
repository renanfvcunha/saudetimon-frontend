import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import useStyles from './styles';
import Container from '../../components/Container';

const ShowPatient: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container>
        <Typography component="h1" variant="h3" align="center">
          Detalhes do Paciente
        </Typography>
      </Container>
    </main>
  );
};

export default ShowPatient;
