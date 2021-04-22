import React, { useCallback, useEffect, useState } from 'react';
import {
  Typography,
  Tooltip,
  Fab,
  Card,
  CardContent,
  CardActions,
  ThemeProvider,
  Button,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import DefaultBox from '../../../components/DefaultBox';
import useStyles, { doubtActionsBtns } from './styles';
import ModalAddDoubt from './ModalAddDoubt';
import IDoubt from '../../../typescript/IDoubt';
import api from '../../../services/api';
import catchHandler from '../../../utils/catchHandler';

const FrequentDoubts: React.FC = () => {
  const classes = useStyles();
  const [doubts, setDoubts] = useState<IDoubt[]>();
  const [modalAddDoubt, setModalAddDoubt] = useState(false);
  const [success, setSuccess] = useState(false);

  const closeModal = () => {
    if (modalAddDoubt) setModalAddDoubt(false);
  };

  const getDoubts = useCallback(async () => {
    try {
      const response = await api.get('/doubts');

      setDoubts(response.data);
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível listar as dúvidas frequentes. Tente novamente ou contate o suporte.'
      );
    }
  }, []);

  const setSuccessTrue = () => setSuccess(true);

  useEffect(() => {
    getDoubts();
  }, [getDoubts]);

  useEffect(() => {
    if (success) {
      getDoubts();
      setSuccess(false);
    }
  }, [getDoubts, success]);

  return (
    <>
      <DefaultBox scrollable>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          className={classes.boxTitle}
        >
          Dúvidas Frequentes&nbsp;
          <Tooltip title="Nova Dúvida" onClick={() => setModalAddDoubt(true)}>
            <Fab color="primary" size="small">
              <Add />
            </Fab>
          </Tooltip>
        </Typography>

        <div className={classes.frequentDoubts}>
          {doubts &&
            doubts.map(doubt => (
              <Card key={doubt.id} className={classes.doubtsCard}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    {doubt.question}
                  </Typography>
                  <Typography component="p" className={classes.mt05}>
                    {doubt.answer}
                  </Typography>
                </CardContent>
                <CardActions className={classes.doubtsActions}>
                  <ThemeProvider theme={doubtActionsBtns}>
                    <Button color="primary">Editar</Button>
                    <Button color="secondary">Excluir</Button>
                  </ThemeProvider>
                </CardActions>
              </Card>
            ))}
        </div>
      </DefaultBox>
      <ModalAddDoubt
        open={modalAddDoubt}
        close={closeModal}
        setSuccess={setSuccessTrue}
      />
    </>
  );
};

export default FrequentDoubts;
