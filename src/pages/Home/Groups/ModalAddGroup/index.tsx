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
import catchHandler from '../../../../utils/catchHandler';
import api from '../../../../services/api';

interface Props {
  open: boolean;
  close: () => void;
  refreshData: () => Promise<void>;
}

const ModalAddGroup: React.FC<Props> = ({ open, close, refreshData }) => {
  const classes = useStyles();
  const [group, setGroup] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddGroup = async () => {
    setLoading(true);

    try {
      const response = await api.post('/groups', { group });

      toast.success(response.data.msg);
      setGroup('');
      refreshData();
      close();
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível adicionar o grupo. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultModal open={open} close={close}>
      <Typography component="h1" variant="h4" align="center">
        Novo Grupo
      </Typography>

      <div className={classes.inputs}>
        <TextField
          label="Grupo"
          variant="outlined"
          className={classes.input}
          value={group}
          onChange={e => setGroup(e.target.value)}
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
          <Button color="primary" onClick={handleAddGroup} disabled={loading}>
            Adicionar
          </Button>
        </ThemeProvider>
      </div>
    </DefaultModal>
  );
};

ModalAddGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default React.memo(ModalAddGroup);
