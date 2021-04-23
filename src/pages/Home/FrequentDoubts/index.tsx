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
import { toast } from 'react-toastify';

import DefaultBox from '../../../components/DefaultBox';
import useStyles, { doubtActionsBtns } from './styles';
import { buttonsTheme } from './ModalAddDoubt/styles';
import ModalAddDoubt from './ModalAddDoubt';
import IDoubt from '../../../typescript/IDoubt';
import api from '../../../services/api';
import catchHandler from '../../../utils/catchHandler';
import ModalEditDoubt from './ModalEditDoubt';
import ModalConfirmation from '../../../components/ModalConfirmation';

const FrequentDoubts: React.FC = () => {
  const classes = useStyles();
  const [doubts, setDoubts] = useState<IDoubt[]>();
  const [modalAddDoubt, setModalAddDoubt] = useState(false);
  const [modalEditDoubt, setModalEditDoubt] = useState(false);
  const [modalRemoveDoubt, setModalRemoveDoubt] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState<string>();
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    if (modalAddDoubt) setModalAddDoubt(false);
    if (modalEditDoubt) setModalEditDoubt(false);
    if (modalRemoveDoubt) setModalRemoveDoubt(false);
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

  const handleRemoveDoubt = async () => {
    setLoading(true);

    try {
      const response = await api.delete(`/doubts/${selectedDoubt}`);

      toast.success(response.data.msg);
      getDoubts();
      closeModal();
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível remover a dúvida. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

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
                    <Button
                      color="primary"
                      onClick={() => {
                        setSelectedDoubt(doubt.id.toString());
                        setModalEditDoubt(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        setSelectedDoubt(doubt.id.toString());
                        setModalRemoveDoubt(true);
                      }}
                    >
                      Excluir
                    </Button>
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

      {selectedDoubt && (
        <ModalEditDoubt
          open={modalEditDoubt}
          close={closeModal}
          setSuccess={setSuccessTrue}
          idDoubt={selectedDoubt}
        />
      )}

      <ThemeProvider theme={buttonsTheme}>
        <ModalConfirmation
          open={modalRemoveDoubt}
          close={closeModal}
          title="Alerta"
          msg="Deseja excluir esta dúvida?"
          cancel="Cancelar"
          confirm="Excluir"
          confirmAction={handleRemoveDoubt}
          loading={loading}
        />
      </ThemeProvider>
    </>
  );
};

export default FrequentDoubts;
