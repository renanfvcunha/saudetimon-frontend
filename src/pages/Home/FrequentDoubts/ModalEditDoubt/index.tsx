import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import DefaultModal from '../../../../components/DefaultModal';
import useStyles, { buttonsTheme } from './styles';
import catchHandler from '../../../../utils/catchHandler';
import api from '../../../../services/api';

interface Props {
  open: boolean;
  close: () => void;
  setSuccess: () => void;
  idDoubt: string;
}

const ModalEditDoubt: React.FC<Props> = ({
  open,
  close,
  setSuccess,
  idDoubt,
}) => {
  const classes = useStyles();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const clearFields = () => {
    setQuestion('');
    setAnswer('');
  };

  const handleEditDoubt = async () => {
    setLoading(true);

    try {
      const response = await api.put(`/doubts/${idDoubt}`, {
        question,
        answer,
      });

      toast.success(response.data.msg);
      clearFields();
      setSuccess();
      close();
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível editar a dúvida. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getDoubt = async () => {
      try {
        const response = await api.get(`/doubts/${idDoubt}`);

        setQuestion(response.data.question);
        setAnswer(response.data.answer);
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar a dúvida. Tente novamente ou contate o suporte.'
        );
      }
    };

    getDoubt();
  }, [idDoubt]);

  return (
    <DefaultModal open={open} close={close}>
      <Typography component="h1" variant="h4" align="center">
        Nova Dúvida
      </Typography>

      <div className={classes.inputs}>
        <TextField
          label="Pergunta"
          variant="outlined"
          className={classes.input}
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <TextField
          label="Resposta"
          variant="outlined"
          multiline
          className={classes.input}
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
      </div>

      {loading && (
        <div className={classes.loading}>
          <CircularProgress size={24} />
        </div>
      )}

      <div className={classes.buttons}>
        <ThemeProvider theme={buttonsTheme}>
          <Button color="secondary" onClick={close} disabled={loading}>
            Cancelar
          </Button>
          <Button color="primary" onClick={handleEditDoubt} disabled={loading}>
            Salvar
          </Button>
        </ThemeProvider>
      </div>
    </DefaultModal>
  );
};

ModalEditDoubt.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  idDoubt: PropTypes.string.isRequired,
};

export default React.memo(ModalEditDoubt);
