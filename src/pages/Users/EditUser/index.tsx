import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useContext,
} from 'react';
import {
  Typography,
  TextField,
  FormControl,
  Button,
  ThemeProvider,
  Tooltip,
  Fab,
  CircularProgress,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import DefaultModal from '../../../components/DefaultModal';
import IUser from '../../../typescript/IUser';
import useStyles, { Green } from './styles';
import UserContext from '../../../contexts/userContext';
import catchHandler, { Err } from '../../../utils/catchHandler';

interface IModal {
  open: boolean;
  close: () => void;
  setSuccess: () => void;
  idUser: string;
}

const EditUser: React.FC<IModal> = ({ open, close, setSuccess, idUser }) => {
  const classes = useStyles();
  const { updateUserCall, getUserCall } = useContext(UserContext);

  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const handleChangeAdmin = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmin(e.target.value);
  };

  const clearFields = () => {
    setName('');
    setUsername('');
    setAdmin('');
    setPassword('');
    setPasswordConf('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const adminParsed = admin === '1';
    setLoading(true);

    try {
      const msg = await updateUserCall(
        idUser,
        name,
        username,
        adminParsed,
        password,
        passwordConf
      );

      toast.success(msg);
      setSuccess();
      clearFields();
      close();
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível atualizar o usuário. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getUserCall(idUser);

        setUser(data);
      } catch (err) {
        catchHandler(
          err as Err,
          'Não foi possível listar os dados do usuário. Tente novamente ou contate o suporte.'
        );
      }
    };

    getUser();
  }, [getUserCall, idUser]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setAdmin(user.admin === true ? '1' : '0');
    }
  }, [user]);

  return (
    <ThemeProvider theme={Green}>
      <DefaultModal open={open} close={close}>
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
        <div className={classes.form}>
          <form className={classes.formBox} onSubmit={handleSubmit}>
            <div className={classes.formRoot}>
              <Typography
                variant="h5"
                className={classes.title}
                align="center"
                color="secondary"
              >
                Editar {user && user.name.split(' ')[0]}
              </Typography>

              <TextField
                label="Nome Completo"
                required
                className={classes.field}
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <TextField
                label="Nome de Usuário"
                required
                className={classes.field}
                fullWidth
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              <FormControl
                component="fieldset"
                fullWidth
                className={classes.field}
              >
                <FormLabel component="legend">Admin</FormLabel>
                <RadioGroup value={admin} onChange={handleChangeAdmin}>
                  <div>
                    <FormControlLabel
                      value="0"
                      control={<Radio color="primary" />}
                      label="Não"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label="Sim"
                    />
                  </div>
                </RadioGroup>
              </FormControl>

              <TextField
                label="Senha"
                className={classes.field}
                style={{ marginTop: 0 }}
                type="password"
                fullWidth
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <TextField
                label="Confirmar Senha"
                className={classes.field}
                type="password"
                fullWidth
                value={passwordConf}
                onChange={e => setPasswordConf(e.target.value)}
              />

              {loading && (
                <div className={classes.progress}>
                  <CircularProgress />
                </div>
              )}

              <FormControl className={classes.subButton} fullWidth>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Salvar
                </Button>
              </FormControl>
            </div>
          </form>
        </div>
      </DefaultModal>
    </ThemeProvider>
  );
};

EditUser.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  idUser: PropTypes.string.isRequired,
};

/* EditUser.defaultProps = {
  idUser: '',
}; */

export default EditUser;
