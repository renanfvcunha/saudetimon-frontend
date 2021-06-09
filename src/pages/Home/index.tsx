import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';

import useStyles from './styles';
import Container from '../../components/Container';
import FrequentDoubts from './FrequentDoubts';
import Comorbidities from './Comorbidities';
import VaccineLocations from './VaccineLocations';
import Phones from './Phones';

const Home: React.FC = () => {
  const classes = useStyles();
  const [modalFreqDoubts, setModalFreqDoubts] = useState(false);
  const [modalComorbidities, setModalComorbidities] = useState(false);
  const [modalVaccineLocations, setModalVaccineLocations] = useState(false);
  const [modalPhones, setModalPhones] = useState(false);

  const closeModal = () => {
    if (modalFreqDoubts) setModalFreqDoubts(false);
    if (modalComorbidities) setModalComorbidities(false);
    if (modalVaccineLocations) setModalVaccineLocations(false);
    if (modalPhones) setModalPhones(false);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container>
        <Typography component="h1" variant="h3" align="center">
          Página Inicial
        </Typography>

        <div className={classes.list}>
          <List>
            <ListItem button onClick={() => setModalComorbidities(true)}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary="Gerenciar Comorbidades"
                disableTypography
                className={classes.listText}
              />
            </ListItem>
            <ListItem button onClick={() => setModalFreqDoubts(true)}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary="Gerenciar Dúvidas Frequentes"
                disableTypography
                className={classes.listText}
              />
            </ListItem>
            <ListItem button onClick={() => setModalVaccineLocations(true)}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary="Gerenciar Locais de Vacinação"
                disableTypography
                className={classes.listText}
              />
            </ListItem>
            <ListItem button onClick={() => setModalPhones(true)}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary="Gerenciar Fale Conosco"
                disableTypography
                className={classes.listText}
              />
            </ListItem>
          </List>
        </div>

        <FrequentDoubts open={modalFreqDoubts} close={closeModal} />
        <Comorbidities open={modalComorbidities} close={closeModal} />
        <VaccineLocations open={modalVaccineLocations} close={closeModal} />
        <Phones open={modalPhones} close={closeModal} />
      </Container>
    </main>
  );
};

export default Home;
