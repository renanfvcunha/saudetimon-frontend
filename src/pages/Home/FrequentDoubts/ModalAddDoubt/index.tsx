import React, { useState } from 'react';
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
import catchHandler, { Err } from '../../../../utils/catchHandler';
import api from '../../../../services/api';

interface Props {
  open: boolean;
  close: () => void;
  setSuccess: () => void;
}

const ModalAddDoubt: React.FC<Props> = ({ open, close, setSuccess }) => {
  const classes = useStyles();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const clearFields = () => {
    setQuestion('');
    setAnswer('');
  };

  const handleAddDoubt = async () => {
    setLoading(true);

    try {
      const response = await api.post('/doubts', { question, answer });

      toast.success(response.data.msg);
      clearFields();
      setSuccess();
      close();
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível adicionar a dúvida. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

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
          <Button color="primary" onClick={handleAddDoubt} disabled={loading}>
            Adicionar
          </Button>
        </ThemeProvider>
      </div>
    </DefaultModal>
  );
};

ModalAddDoubt.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
};

export default React.memo(ModalAddDoubt);
