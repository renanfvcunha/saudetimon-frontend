import React, { ChangeEvent, useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import DefaultModal from '../../../../components/DefaultModal';
import useStyles, { buttonsTheme } from './styles';
import catchHandler, { Err } from '../../../../utils/catchHandler';
import ICategory from '../../../../typescript/ICategory';
import api from '../../../../services/api';

interface Props {
  open: boolean;
  close: () => void;
  refreshData: () => Promise<void>;
  idCategory: string;
  idGroup: string;
  groupName: string;
}

const ModalEditGroup: React.FC<Props> = ({
  open,
  close,
  refreshData,
  idCategory,
  idGroup,
  groupName,
}) => {
  const classes = useStyles();
  const [categories, setCategories] = useState<ICategory[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [group, setGroup] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeCategory = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(e.target.value as string);
  };

  const handleAddDoubt = async () => {
    setLoading(true);

    try {
      const response = await api.put(`/groups/${idGroup}`, {
        group,
        idCategory: Number(selectedCategory),
      });

      toast.success(response.data.msg);
      refreshData();
      close();
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível editar a comorbidade. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response: AxiosResponse<ICategory[]> = await api.get(
          '/categories'
        );

        setCategories(response.data);
      } catch (err) {
        catchHandler(
          err as Err,
          'Não foi possível listar as categorias. Tente novamente ou contate o suporte.'
        );
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (groupName !== '') {
      setGroup(groupName);
    }

    if (idCategory !== '') {
      setSelectedCategory(idCategory);
    }
  }, [groupName, idCategory]);

  return (
    <DefaultModal open={open} close={close}>
      <Typography component="h1" variant="h4" align="center">
        Editar Grupo
      </Typography>

      <div className={classes.inputs}>
        <FormControl variant="outlined" style={{ marginBottom: '1rem' }}>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleChangeCategory}
            label="Categoria"
          >
            {categories &&
              categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id.toString()}>
                  {cat.category}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
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
          <Button color="primary" onClick={handleAddDoubt} disabled={loading}>
            Salvar
          </Button>
        </ThemeProvider>
      </div>
    </DefaultModal>
  );
};

ModalEditGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
  idCategory: PropTypes.string.isRequired,
  idGroup: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
};

export default React.memo(ModalEditGroup);
