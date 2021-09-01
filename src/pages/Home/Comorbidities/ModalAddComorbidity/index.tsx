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
  refreshData: () => Promise<void>;
}

const ModalAddComorbidity: React.FC<Props> = ({ open, close, refreshData }) => {
  const classes = useStyles();
  const [comorbidity, setComorbidity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddDoubt = async () => {
    setLoading(true);

    try {
      const response = await api.post('/comorbidities', { comorbidity });

      toast.success(response.data.msg);
      setComorbidity('');
      refreshData();
      close();
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível adicionar a comorbidade. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultModal open={open} close={close}>
      <Typography component="h1" variant="h4" align="center">
        Nova Comorbidade
      </Typography>

      <div className={classes.inputs}>
        <TextField
          label="Comorbidade"
          variant="outlined"
          className={classes.input}
          value={comorbidity}
          onChange={e => setComorbidity(e.target.value)}
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

ModalAddComorbidity.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default React.memo(ModalAddComorbidity);
