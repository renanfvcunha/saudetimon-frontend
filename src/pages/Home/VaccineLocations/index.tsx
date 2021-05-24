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

import useStyles, { actionButtons, btnGreen } from './styles';
import DefaultModal from '../../../components/DefaultModal';
import IVaccineLocation from '../../../typescript/IVaccineLocation';
import catchHandler from '../../../utils/catchHandler';
import api from '../../../services/api';

interface Props {
  open: boolean;
  close: () => void;
}

const VaccineLocations: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();
  const [locations, setLocations] = useState<IVaccineLocation[]>();
  const [modalAddLocation, setModalAddLocation] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response: AxiosResponse<IVaccineLocation[]> = await api.get(
          '/vaccinelocations'
        );

        setLocations(response.data);
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar os locais de vacinação. Tente novamente ou contate o suporte.'
        );
      }
    };

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
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remover Local">
                      <IconButton color="secondary">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ThemeProvider>
              </ListItem>
            ))}
        </List>
      </div>

      {/* <ModalAddComorbidity
        open={modalAddComorbidity}
        close={closeModal}
        refreshData={getComorbidities}
      />

      <ModalEditComorbidity
        open={modalEditComorbidity}
        close={closeModal}
        refreshData={getComorbidities}
        idComorbidity={selectedComorbidityId}
        comorbidityName={selectedComorbidityName}
      />

      <ThemeProvider theme={buttonsTheme}>
        <ModalConfirmation
          open={modalConfirmation}
          close={closeModal}
          title="Alerta de Exclusão"
          msg={
            <>
              Deseja remover a comorbidade&nbsp;&quot;
              <strong>{selectedComorbidityName}</strong>&quot;?
            </>
          }
          confirm="Remover"
          cancel="Cancelar"
          confirmAction={handleRemoveComorbidity}
        />
      </ThemeProvider> */}
    </DefaultModal>
  );
};

VaccineLocations.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default VaccineLocations;
