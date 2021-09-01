import React, { useEffect, useState, Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Fab,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add, ArrowBack, Edit, Remove } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import useStyles, { actionButtons } from './styles';
import { buttonsTheme } from './ModalAddComorbidity/styles';
import IComorbidity from '../../../typescript/IComorbidity';
import catchHandler, { Err } from '../../../utils/catchHandler';
import ModalAddComorbidity from './ModalAddComorbidity';
import ModalEditComorbidity from './ModalEditComorbidity';
import ModalConfirmation from '../../../components/ModalConfirmation';
import api from '../../../services/api';
import DefaultModal from '../../../components/DefaultModal';

interface Props {
  open: boolean;
  close: () => void;
}

const Comorbidities: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();

  const [comorbidities, setComorbidities] = useState<IComorbidity[]>();
  const [modalAddComorbidity, setModalAddComorbidity] = useState(false);
  const [modalEditComorbidity, setModalEditComorbidity] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [selectedComorbidityId, setSelectedComorbidityId] = useState('');
  const [selectedComorbidityName, setSelectedComorbidityName] = useState('');

  const closeModal = () => {
    if (modalAddComorbidity) setModalAddComorbidity(false);
    if (modalEditComorbidity) setModalEditComorbidity(false);
    if (modalConfirmation) setModalConfirmation(false);
  };

  const getComorbidities = useCallback(async () => {
    try {
      const response: AxiosResponse<IComorbidity[]> = await api.get(
        '/comorbidities'
      );

      setComorbidities(response.data);
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível listar as comorbidades. Tente novamente ou contate o suporte.'
      );
    }
  }, []);

  const handleRemoveComorbidity = async () => {
    try {
      const response: AxiosResponse<{ msg: string }> = await api.delete(
        `/comorbidities/${selectedComorbidityId}`
      );

      toast.success(response.data.msg);
      getComorbidities();
      setModalConfirmation(false);
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível remover a comorbidade. Tente novamente ou contate o suporte.'
      );
    }
  };

  useEffect(() => {
    getComorbidities();
  }, [getComorbidities]);

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

      <Typography
        component="h1"
        variant="h4"
        align="center"
        className={classes.boxTitle}
      >
        Comorbidades&nbsp;
        <Tooltip
          title="Nova Comorbidade"
          onClick={() => setModalAddComorbidity(true)}
        >
          <Fab color="primary" size="small">
            <Add />
          </Fab>
        </Tooltip>
      </Typography>

      <ThemeProvider theme={actionButtons}>
        <div className={classes.content}>
          {comorbidities &&
            comorbidities.map(comorbidity => (
              <Fragment key={comorbidity.id}>
                <div className={classes.comorbidityContent}>
                  <Tooltip
                    title="Editar Comorbidade"
                    onClick={() => {
                      setModalEditComorbidity(true);
                      setSelectedComorbidityId(comorbidity.id.toString());
                      setSelectedComorbidityName(comorbidity.comorbidity);
                    }}
                  >
                    <Fab color="primary" size="small">
                      <Edit />
                    </Fab>
                  </Tooltip>
                  <Typography component="span" className={classes.comorbidity}>
                    {comorbidity.comorbidity}
                  </Typography>
                  <Tooltip
                    title="Remover Comorbidade"
                    onClick={() => {
                      setModalConfirmation(true);
                      setSelectedComorbidityId(comorbidity.id.toString());
                      setSelectedComorbidityName(comorbidity.comorbidity);
                    }}
                  >
                    <Fab color="secondary" size="small">
                      <Remove />
                    </Fab>
                  </Tooltip>
                </div>
                <Divider className={classes.divider} />
              </Fragment>
            ))}
        </div>
      </ThemeProvider>

      <ModalAddComorbidity
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
      </ThemeProvider>
    </DefaultModal>
  );
};

Comorbidities.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Comorbidities;
