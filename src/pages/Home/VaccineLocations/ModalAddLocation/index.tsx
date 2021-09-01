import React, { useState, createRef, ChangeEvent } from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Clear } from '@material-ui/icons';
import { toast } from 'react-toastify';

import DefaultModal from '../../../../components/DefaultModal';
import useStyles, { buttonsTheme } from './styles';
import catchHandler, { Err } from '../../../../utils/catchHandler';
import api from '../../../../services/api';

interface Props {
  open: boolean;
  close: () => void;
  refreshData: () => void;
}

const ModalAddLocation: React.FC<Props> = ({ open, close, refreshData }) => {
  const classes = useStyles();
  const inputPictureRef = createRef<HTMLInputElement>();

  const [name, setName] = useState('');
  const [helperText, setHelperText] = useState('');
  const [url, setUrl] = useState('');
  const [picture, setPicture] = useState<File>();
  const [loading, setLoading] = useState(false);

  const clearFields = () => {
    setName('');
    setHelperText('');
    setPicture(undefined);
  };

  const handleSetPicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size > 1048576) {
        toast.error('Tamanho máximo de 1 MB');
      } else {
        setPicture(e.target.files[0]);
      }
    }
  };

  const handleAddLocation = async () => {
    setLoading(true);

    const data = new FormData();
    data.append('name', name);
    data.append('helperText', helperText);
    data.append('url', url);
    if (picture) {
      data.append('picture', picture);
    }

    try {
      const response = await api.post('/vaccinelocations', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response.data.msg);
      clearFields();
      refreshData();
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
        Novo Local
      </Typography>

      <div className={classes.inputs}>
        <TextField
          label="Nome"
          helperText="Nome do Local"
          variant="outlined"
          className={classes.input}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Texto Auxiliar"
          helperText="Ex: Drives-Thru, Ponto Fixo, ..."
          variant="outlined"
          className={classes.input}
          value={helperText}
          onChange={e => setHelperText(e.target.value)}
        />
        <TextField
          label="URL"
          helperText="Link do Google Maps"
          variant="outlined"
          className={classes.input}
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Button
          variant="outlined"
          className={classes.input}
          onClick={() => inputPictureRef.current?.click()}
        >
          Foto do Local
        </Button>
        <input
          type="file"
          hidden
          ref={inputPictureRef}
          accept="image/*"
          onChange={handleSetPicture}
        />
        {picture && (
          <div className={classes.pictureArea}>
            <Avatar
              src={URL.createObjectURL(picture)}
              className={classes.picture}
            />
            <Tooltip title="Remover Imagem" className={classes.btnClearPicture}>
              <IconButton onClick={() => setPicture(undefined)}>
                <Clear className={classes.btnClearPictureIcon} />
              </IconButton>
            </Tooltip>
          </div>
        )}
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
          <Button
            color="primary"
            onClick={handleAddLocation}
            disabled={loading}
          >
            Adicionar
          </Button>
        </ThemeProvider>
      </div>
    </DefaultModal>
  );
};

ModalAddLocation.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default React.memo(ModalAddLocation);
