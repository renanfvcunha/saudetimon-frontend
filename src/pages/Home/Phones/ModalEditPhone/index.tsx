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
import { AxiosResponse } from 'axios';

import DefaultModal from '../../../../components/DefaultModal';
import useStyles, { buttonsTheme } from './styles';
import catchHandler from '../../../../utils/catchHandler';
import api from '../../../../services/api';
import masks from '../../../../utils/masks';
import IPhone from '../../../../typescript/IPhone';

interface Props {
  open: boolean;
  close: () => void;
  contact: IPhone;
  refreshData: () => Promise<void>;
}

const ModalEditPhone: React.FC<Props> = ({
  open,
  close,
  contact,
  refreshData,
}) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEditPhone = async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<{ msg: string }> = await api.put(
        `/phones/${contact.id}`,
        {
          name,
          phone: masks.numberMask(phone),
        }
      );

      toast.success(response.data.msg);
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

  useEffect(() => {
    setName(contact.name);
    setPhone(masks.phoneMask(contact.phone));
  }, [contact]);

  return (
    <DefaultModal open={open} close={close}>
      <Typography component="h1" variant="h4" align="center">
        Editar Contato
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
          <Button color="primary" onClick={handleEditPhone} disabled={loading}>
            Salvar
          </Button>
        </ThemeProvider>
      </div>
    </DefaultModal>
  );
};

ModalEditPhone.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default React.memo(ModalEditPhone);
