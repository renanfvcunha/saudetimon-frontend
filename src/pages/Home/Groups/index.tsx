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
import { buttonsTheme } from './ModalAddGroup/styles';
import IGroup from '../../../typescript/IGroup';
import catchHandler, { Err } from '../../../utils/catchHandler';
import ModalAddGroup from './ModalAddGroup';
import ModalEditGroup from './ModalEditGroup';
import ModalConfirmation from '../../../components/ModalConfirmation';
import api from '../../../services/api';
import DefaultModal from '../../../components/DefaultModal';

interface Props {
  open: boolean;
  close: () => void;
}

const Groups: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();

  const [groups, setGroups] = useState<IGroup[]>();
  const [modalAddGroup, setModalAddGroup] = useState(false);
  const [modalEditGroup, setModalEditGroup] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedGroupName, setSelectedGroupName] = useState('');

  const closeModal = () => {
    if (modalAddGroup) setModalAddGroup(false);
    if (modalEditGroup) setModalEditGroup(false);
    if (modalConfirmation) setModalConfirmation(false);
  };

  const getGroups = useCallback(async () => {
    try {
      const response: AxiosResponse<IGroup[]> = await api.get('/groups');

      setGroups(response.data);
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível listar os grupos. Tente novamente ou contate o suporte.'
      );
    }
  }, []);

  const handleRemoveGroup = async () => {
    try {
      const response: AxiosResponse<{ msg: string }> = await api.delete(
        `/groups/${selectedGroupId}`
      );

      toast.success(response.data.msg);
      getGroups();
      setModalConfirmation(false);
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível remover os grupos. Tente novamente ou contate o suporte.'
      );
    }
  };

  useEffect(() => {
    getGroups();
  }, [getGroups]);

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
        Grupos&nbsp;
        <Tooltip title="Novo Grupo" onClick={() => setModalAddGroup(true)}>
          <Fab color="primary" size="small">
            <Add />
          </Fab>
        </Tooltip>
      </Typography>

      <ThemeProvider theme={actionButtons}>
        <div className={classes.content}>
          {groups &&
            groups.map(group => (
              <Fragment key={group.id}>
                <div className={classes.items}>
                  <Tooltip
                    title="Editar Grupo"
                    onClick={() => {
                      setModalEditGroup(true);
                      setSelectedCategoryId(
                        group.category ? group.category.id.toString() : ''
                      );
                      setSelectedGroupId(group.id.toString());
                      setSelectedGroupName(group.group);
                    }}
                  >
                    <Fab color="primary" size="small">
                      <Edit />
                    </Fab>
                  </Tooltip>
                  <div className={classes.itemBox}>
                    <Typography component="span" className={classes.itemName}>
                      {group.group}
                    </Typography>
                    {group.category && (
                      <Typography
                        component="span"
                        className={classes.categoryText}
                      >
                        Categoria: {group.category.category}
                      </Typography>
                    )}
                  </div>
                  <Tooltip
                    title="Remover Grupo"
                    onClick={() => {
                      setModalConfirmation(true);
                      setSelectedGroupId(group.id.toString());
                      setSelectedGroupName(group.group);
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

      <ModalAddGroup
        open={modalAddGroup}
        close={closeModal}
        refreshData={getGroups}
      />

      <ModalEditGroup
        open={modalEditGroup}
        close={closeModal}
        refreshData={getGroups}
        idCategory={selectedCategoryId}
        idGroup={selectedGroupId}
        groupName={selectedGroupName}
      />

      <ThemeProvider theme={buttonsTheme}>
        <ModalConfirmation
          open={modalConfirmation}
          close={closeModal}
          title="Alerta de Exclusão"
          msg={
            <>
              Deseja remover o grupo&nbsp;&quot;
              <strong>{selectedGroupName}</strong>&quot;?
            </>
          }
          confirm="Remover"
          cancel="Cancelar"
          confirmAction={handleRemoveGroup}
        />
      </ThemeProvider>
    </DefaultModal>
  );
};

Groups.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Groups;
