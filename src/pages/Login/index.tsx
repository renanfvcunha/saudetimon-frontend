import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  ThemeProvider,
} from '@material-ui/core';

import useStyles, { Purple } from './styles';
import AuthContext from '../../contexts/authContext';
import logoGED from '../../images/logoGED.png';

const Login: React.FC = () => {
  const classes = useStyles();
  const { loading, signIn } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleCheckRemember = (e: ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    signIn(username, password, remember);
  };

  return (
    <ThemeProvider theme={Purple}>
      <main className={classes.content}>
        <Container maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img src={logoGED} alt="Logo B2B Ged" width="200" height="200" />
            <form className={classes.form} onSubmit={handleSubmit}>
              {process.env.NODE_ENV !== 'production' && (
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Nome de usuário"
                  autoFocus
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className={classes.input}
                  color="primary"
                />
              )}

              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={classes.input}
                color="primary"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={remember}
                    onChange={handleCheckRemember}
                  />
                }
                label="Lembrar"
                labelPlacement="start"
                className={classes.lembrar}
              />

              {loading ? (
                <div className={classes.progress}>
                  <CircularProgress />
                </div>
              ) : (
                ''
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Entrar
              </Button>
            </form>
          </div>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Login;
