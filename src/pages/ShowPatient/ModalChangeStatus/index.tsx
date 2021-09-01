import React, { ChangeEvent, useEffect, useState, useContext } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import DefaultModal from '../../../components/DefaultModal';
import useStyles, { ActButtons } from './styles';
import catchHandler, { Err } from '../../../utils/catchHandler';
import PatientContext from '../../../contexts/patientContext';
import IStatus from '../../../typescript/IStatus';

interface Props {
  idPatient: string;
  open: boolean;
  reloadData: () => Promise<void>;
  close: () => void;
  idStatus: string;
  message: string | null;
}

const ModalChangeStatus: React.FC<Props> = ({
  idPatient,
  open,
  reloadData,
  close,
  idStatus,
  message,
}) => {
  const classes = useStyles();
  const { getStatusCall, handleChangePatientStatusCall } = useContext(
    PatientContext
  );

  const [status, setStatus] = useState<IStatus[]>();
  const [statusMsg, setStatusMsg] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeStatus = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedStatus(e.target.value as string);
  };

  const handleChangePatientStatus = async () => {
    setLoading(true);

    try {
      const statusMsgParsed = statusMsg !== '' ? statusMsg : null;

      const msg = await handleChangePatientStatusCall(
        idPatient,
        selectedStatus,
        statusMsgParsed
      );

      toast.success(msg);
      setSelectedStatus('');
      setStatusMsg('');
      reloadData();
      close();
    } catch (err) {
      catchHandler(
        err as Err,
        'Erro ao alterar status do paciente. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getStatus = async () => {
      const data = await getStatusCall();

      setStatus(data);
    };

    getStatus();
  }, [getStatusCall]);

  useEffect(() => {
    setSelectedStatus(idStatus);
    if (message) {
      setStatusMsg(message);
    }
  }, [idStatus, message]);

  return (
    <DefaultModal open={open} close={close}>
      <div className={classes.modalContent}>
        <Typography component="h1" variant="h6" className={classes.modalTitle}>
          Alterar Status
        </Typography>

        <FormControl variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={handleChangeStatus}
            label="Status"
          >
            {status &&
              status.map(stts => (
                <MenuItem key={stts.id} value={stts.id.toString()}>
                  {stts.status}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label="Mensagem Informativa (Opcional)"
          multiline
          rows={3}
          className={classes.msgField}
          variant="outlined"
          value={statusMsg}
          onChange={e => setStatusMsg(e.target.value)}
        />

        {loading && (
          <div className={classes.loading}>
            <CircularProgress size={24} />
          </div>
        )}

        <ThemeProvider theme={ActButtons}>
          <div className={clsx([classes.actButtons, classes.mt1])}>
            <Button color="secondary" onClick={close} disabled={loading}>
              Cancelar
            </Button>
            <Button
              color="primary"
              onClick={handleChangePatientStatus}
              disabled={loading}
            >
              Alterar
            </Button>
          </div>
        </ThemeProvider>
      </div>
    </DefaultModal>
  );
};

ModalChangeStatus.propTypes = {
  idPatient: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  reloadData: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  idStatus: PropTypes.string.isRequired,
  message: PropTypes.string,
};

ModalChangeStatus.defaultProps = {
  message: null,
};

export default ModalChangeStatus;
