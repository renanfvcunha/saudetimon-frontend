import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add, ArrowBack, Delete, Edit } from '@material-ui/icons';
import { AxiosResponse } from 'axios';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import useStyles, { actionButtons, btnGreen, confirmationBtns } from './styles';
import DefaultModal from '../../../components/DefaultModal';
import IVaccineLocation from '../../../typescript/IVaccineLocation';
import catchHandler, { Err } from '../../../utils/catchHandler';
import api from '../../../services/api';
import ModalAddLocation from './ModalAddLocation';
import ModalEditLocation from './ModalEditLocation';
import ModalConfirmation from '../../../components/ModalConfirmation';

interface Props {
  open: boolean;
  close: () => void;
}

const VaccineLocations: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();
  const [locations, setLocations] = useState<IVaccineLocation[]>();
  const [selectedLocation, setSelectedLocation] = useState<IVaccineLocation>();
  const [modalAddLocation, setModalAddLocation] = useState(false);
  const [modalEditLocation, setModalEditLocation] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);

  const closeModal = () => {
    if (modalAddLocation) setModalAddLocation(false);
    if (modalEditLocation) setModalEditLocation(false);
    if (modalConfirmation) setModalConfirmation(false);
  };

  const getLocations = async () => {
    try {
      const response: AxiosResponse<IVaccineLocation[]> = await api.get(
        '/vaccinelocations'
      );

      setLocations(response.data);
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível listar os locais de vacinação. Tente novamente ou contate o suporte.'
      );
    }
  };

  const handleRemoveLocation = async () => {
    try {
      if (selectedLocation) {
        const response: AxiosResponse<{ msg: string }> = await api.delete(
          `/vaccinelocations/${selectedLocation.id}`
        );

        toast.success(response.data.msg);
        setModalConfirmation(false);
        getLocations();
      }
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível remover o local de vacinação. Tente novamente ou contate o suporte.'
      );
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <DefaultModal open={open} close={close} scrollable>
      <Tooltip
        title="Voltar"
        aria-label="back"
        className={classes.backBtn}
        onClick={close}
      >
        <Fab color="primary" size="small">
          <ArrowBack />
        </Fab>
      </Tooltip>

      <ThemeProvider theme={btnGreen}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          className={classes.boxTitle}
        >
          Locais de Vacinação&nbsp;
          <Tooltip
            title="Adicionar Local"
            onClick={() => setModalAddLocation(true)}
          >
            <Fab color="primary" size="small">
              <Add />
            </Fab>
          </Tooltip>
        </Typography>
      </ThemeProvider>

      <div className={classes.wd500}>
        <List>
          {locations &&
            locations.map(location => (
              <ListItem key={location.id}>
                <ListItemAvatar>
                  <Avatar
                    src={`${process.env.REACT_APP_API_URL}/uploads/vacLocPics/${location.picture}`}
                    alt={location.name}
                    className={classes.avatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={location.name}
                  secondary={location.helperText}
                  className={classes.maxWd286}
                />
                <ThemeProvider theme={actionButtons}>
                  <ListItemSecondaryAction>
                    <Tooltip title="Editar Local">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedLocation(location);
                          setModalEditLocation(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remover Local">
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          setSelectedLocation(location);
                          setModalConfirmation(true);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ThemeProvider>
              </ListItem>
            ))}
        </List>
      </div>

      <ModalAddLocation
        open={modalAddLocation}
        close={closeModal}
        refreshData={getLocations}
      />

      {selectedLocation && (
        <ModalEditLocation
          open={modalEditLocation}
          close={closeModal}
          location={selectedLocation}
          refreshData={getLocations}
        />
      )}

      <ThemeProvider theme={confirmationBtns}>
        <ModalConfirmation
          open={modalConfirmation}
          close={closeModal}
          title="Alerta de Exclusão"
          msg={
            <>
              Deseja remover o local&nbsp;&quot;
              <strong>{selectedLocation?.name}</strong>&quot;?
            </>
          }
          confirm="Remover"
          cancel="Cancelar"
          confirmAction={handleRemoveLocation}
        />
      </ThemeProvider>
    </DefaultModal>
  );
};

VaccineLocations.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default VaccineLocations;
