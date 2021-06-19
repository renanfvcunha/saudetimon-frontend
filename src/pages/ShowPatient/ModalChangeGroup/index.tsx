import React, { ChangeEvent, useEffect, useState, useContext } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import DefaultModal from '../../../components/DefaultModal';
import useStyles, { ActButtons } from './styles';
import catchHandler from '../../../utils/catchHandler';
import PatientContext from '../../../contexts/patientContext';
import IGroup from '../../../typescript/IGroup';

interface Props {
  idPatient: string;
  open: boolean;
  reloadData: () => Promise<void>;
  close: () => void;
  idGroup: string;
}

const ModalChangeGroup: React.FC<Props> = ({
  idPatient,
  open,
  reloadData,
  close,
  idGroup,
}) => {
  const classes = useStyles();
  const { getGroupsCall, handleChangePatientGroupCall } = useContext(
    PatientContext
  );

  const [groups, setGroups] = useState<IGroup[]>();
  const [selectedGroup, setSelectedGroup] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeStatus = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedGroup(e.target.value as string);
  };

  const handleChangePatientStatus = async () => {
    setLoading(true);

    try {
      const msg = await handleChangePatientGroupCall(idPatient, selectedGroup);

      toast.success(msg);
      setSelectedGroup('');
      reloadData();
      close();
    } catch (err) {
      catchHandler(
        err,
        'Erro ao alterar grupo do paciente. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getStatus = async () => {
      const data = await getGroupsCall();

      setGroups(data);
    };

    getStatus();
  }, [getGroupsCall]);

  useEffect(() => {
    setSelectedGroup(idGroup);
  }, [idGroup]);

  return (
    <DefaultModal open={open} close={close}>
      <div className={classes.modalContent}>
        <Typography component="h1" variant="h6" className={classes.modalTitle}>
          Alterar Grupo
        </Typography>

        <FormControl variant="outlined">
          <InputLabel>Grupo</InputLabel>
          <Select
            value={selectedGroup}
            onChange={handleChangeStatus}
            label="Grupo"
          >
            {groups &&
              groups.map(grp => (
                <MenuItem key={grp.id} value={grp.id.toString()}>
                  {grp.group}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

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

ModalChangeGroup.propTypes = {
  idPatient: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  reloadData: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  idGroup: PropTypes.string.isRequired,
};

export default ModalChangeGroup;
