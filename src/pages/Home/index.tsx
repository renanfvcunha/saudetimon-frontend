import React from 'react';
import { Typography } from '@material-ui/core';

import useStyles from './styles';
import Container from '../../components/Container';
import FrequentDoubts from './FrequentDoubts';

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container>
        <Typography component="h1" variant="h3" align="center">
          Página Inicial
        </Typography>

        <FrequentDoubts />
      </Container>
    </main>
  );
};

export default Home;
