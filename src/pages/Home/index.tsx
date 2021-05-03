import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';

import useStyles from './styles';
import Container from '../../components/Container';
import FrequentDoubts from './FrequentDoubts';
// import Comorbidities from './Comorbidities';

const Home: React.FC = () => {
  const classes = useStyles();
  const [modalFreqDoubts, setModalFreqDoubts] = useState(false);
  const [modalComorbidities, setModalComorbidities] = useState(false);

  const closeModal = () => {
    if (modalFreqDoubts) setModalFreqDoubts(false);
    if (modalComorbidities) setModalComorbidities(false);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container>
        <Typography component="h1" variant="h3" align="center">
          Página Inicial
        </Typography>

        <div className={classes.buttons}>
          {/* <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => setModalComorbidities(true)}
          >
            Gerenciar Comorbidades
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => setModalFreqDoubts(true)}
          >
            Gerenciar Dúvidas Frequentes
          </Button>
        </div>

        <FrequentDoubts open={modalFreqDoubts} close={closeModal} />
        {/* <Comorbidities open={modalComorbidities} close={closeModal} /> */}
      </Container>
    </main>
  );
};

export default Home;
