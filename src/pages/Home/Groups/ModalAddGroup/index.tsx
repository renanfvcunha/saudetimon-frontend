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
import catchHandler from '../../../../utils/catchHandler';
import ICategory from '../../../../typescript/ICategory';
import api from '../../../../services/api';

interface Props {
  open: boolean;
  close: () => void;
  refreshData: () => Promise<void>;
}

const ModalAddGroup: React.FC<Props> = ({ open, close, refreshData }) => {
  const classes = useStyles();

  const [group, setGroup] = useState('');
  const [categories, setCategories] = useState<ICategory[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeCategory = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(e.target.value as string);
  };

  const handleAddGroup = async () => {
    setLoading(true);

    try {
      const response = await api.post('/groups', {
        group,
        idCategory: Number(selectedCategory),
      });

      toast.success(response.data.msg);
      setGroup('');
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
    const getCategories = async () => {
      try {
        const response: AxiosResponse<ICategory[]> = await api.get(
          '/categories'
        );

        setCategories(response.data);
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar as categorias. Tente novamente ou contate o suporte.'
        );
      }
    };

    getCategories();
  }, []);

  return (
    <DefaultModal open={open} close={close}>
      <Typography component="h1" variant="h4" align="center">
        Novo Grupo
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
          <Button color="primary" onClick={handleAddGroup} disabled={loading}>
            Adicionar
          </Button>
        </ThemeProvider>
      </div>
    </DefaultModal>
  );
};

ModalAddGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default React.memo(ModalAddGroup);
