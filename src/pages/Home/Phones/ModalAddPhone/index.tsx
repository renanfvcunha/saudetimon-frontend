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
import { AxiosResponse } from 'axios';

import DefaultModal from '../../../../components/DefaultModal';
import useStyles, { buttonsTheme } from './styles';
import catchHandler, { Err } from '../../../../utils/catchHandler';
import api from '../../../../services/api';
import masks from '../../../../utils/masks';

interface Props {
  open: boolean;
  close: () => void;
  refreshData: () => Promise<void>;
}

const ModalAddPhone: React.FC<Props> = ({ open, close, refreshData }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const clearFields = () => {
    setName('');
    setPhone('');
  };

  const handleAddPhone = async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<{ msg: string }> = await api.post(
        '/phones',
        {
          name,
          phone: masks.numberMask(phone),
        }
      );

      toast.success(response.data.msg);
      clearFields();
      refreshData();
      close();
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível adicionar o grupo. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultModal open={open} close={close}>
      <Typography component="h1" variant="h4" align="center">
        Novo Contato
      </Typography>

      <div className={classes.inputs}>
        <TextField
          label="Nome"
          variant="outlined"
          className={classes.input}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Número"
          variant="outlined"
          className={classes.input}
          value={phone}
          onChange={e => setPhone(masks.phoneMask(e.target.value))}
          helperText="(xx) xxxxx-xxxx"
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
          <Button color="primary" onClick={handleAddPhone} disabled={loading}>
            Adicionar
          </Button>
        </ThemeProvider>
      </div>
    </DefaultModal>
  );
};

ModalAddPhone.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default React.memo(ModalAddPhone);
