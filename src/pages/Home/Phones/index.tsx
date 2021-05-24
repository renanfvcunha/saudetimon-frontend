import React, { useEffect, useState, Fragment } from 'react';
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

import useStyles, { actionButtons, confirmationBtns } from './styles';
import catchHandler from '../../../utils/catchHandler';
import ModalAddPhone from './ModalAddPhone';
import ModalEditPhone from './ModalEditPhone';
import ModalConfirmation from '../../../components/ModalConfirmation';
import api from '../../../services/api';
import DefaultModal from '../../../components/DefaultModal';
import IPhone from '../../../typescript/IPhone';
import masks from '../../../utils/masks';

interface Props {
  open: boolean;
  close: () => void;
}

const Phones: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();

  const [phones, setPhones] = useState<IPhone[]>();
  const [selectedPhone, setSelectedPhone] = useState<IPhone>();
  const [modalAddPhone, setModalAddPhone] = useState(false);
  const [modalEditPhone, setModalEditPhone] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);

  const closeModal = () => {
    if (modalAddPhone) setModalAddPhone(false);
    if (modalEditPhone) setModalEditPhone(false);
    if (modalConfirmation) setModalConfirmation(false);
  };

  const getPhones = async () => {
    try {
      const response: AxiosResponse<IPhone[]> = await api.get('/phones');

      setPhones(response.data);
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível listar os contatos. Tente novamente ou contate o suporte.'
      );
    }
  };

  const handleRemovePhone = async () => {
    try {
      if (selectedPhone) {
        const response: AxiosResponse<{ msg: string }> = await api.delete(
          `/phones/${selectedPhone.id}`
        );

        toast.success(response.data.msg);
        getPhones();
        setModalConfirmation(false);
      }
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível remover o contato. Tente novamente ou contate o suporte.'
      );
    }
  };

  useEffect(() => {
    getPhones();
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

      <Typography
        component="h1"
        variant="h4"
        align="center"
        className={classes.boxTitle}
      >
        Fale Conosco&nbsp;
        <Tooltip title="Novo Contato" onClick={() => setModalAddPhone(true)}>
          <Fab color="primary" size="small">
            <Add />
          </Fab>
        </Tooltip>
      </Typography>

      <ThemeProvider theme={actionButtons}>
        <div className={classes.content}>
          {phones &&
            phones.map(phone => (
              <Fragment key={phone.id}>
                <div className={classes.items}>
                  <Tooltip
                    title="Editar Contato"
                    onClick={() => {
                      setSelectedPhone(phone);
                      setModalEditPhone(true);
                    }}
                  >
                    <Fab color="primary" size="small">
                      <Edit />
                    </Fab>
                  </Tooltip>
                  <div className={classes.itemBox}>
                    <Typography component="span" className={classes.itemName}>
                      Nome: {phone.name}
                    </Typography>
                    <Typography component="span" className={classes.helperText}>
                      Número: {masks.phoneMask(phone.phone)}
                    </Typography>
                  </div>
                  <Tooltip
                    title="Remover Contato"
                    onClick={() => {
                      setSelectedPhone(phone);
                      setModalConfirmation(true);
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

      <ModalAddPhone
        open={modalAddPhone}
        close={closeModal}
        refreshData={getPhones}
      />

      {selectedPhone && (
        <>
          <ModalEditPhone
            open={modalEditPhone}
            close={closeModal}
            contact={selectedPhone}
            refreshData={getPhones}
          />

          <ThemeProvider theme={confirmationBtns}>
            <ModalConfirmation
              open={modalConfirmation}
              close={closeModal}
              title="Alerta de Exclusão"
              msg={
                <>
                  Deseja remover o contato&nbsp;&quot;
                  <strong>{selectedPhone.name}</strong>&quot;?
                </>
              }
              confirm="Remover"
              cancel="Cancelar"
              confirmAction={handleRemovePhone}
            />
          </ThemeProvider>
        </>
      )}
    </DefaultModal>
  );
};

Phones.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Phones;
