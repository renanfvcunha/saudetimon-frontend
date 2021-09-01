import React, { useState, useLayoutEffect, useContext } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Collapse,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Home,
  ExitToApp,
  Group,
  AssignmentTurnedIn,
  ExpandLess,
  ExpandMore,
  Star,
  CancelPresentation,
  AssignmentLate,
} from '@material-ui/icons';

import useStyles, { ThemeColor } from './styles';
import Routes from '../../routes';
import authContext from '../../contexts/authContext';
import logo from '../../images/logo.png';
import patientIcon from '../../images/icons/patientIcon.svg';
import exportIcon from '../../images/icons/exportIcon.svg';

const Menu: React.FC = () => {
  const theme = useTheme();
  const { user, signOut } = useContext(authContext);

  const [open, setOpen] = useState(false);
  const [changePathName, setChangePathName] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pathName, setPathName] = useState('');
  const [collapsePatient, setCollapsePatient] = useState(false);

  const cssProps = {
    increaseWidth: collapsePatient,
  };

  const classes = useStyles(cssProps);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    setPathName(window.location.pathname.substr(1));
  }, []);

  useLayoutEffect(() => {
    if (changePathName) {
      setPathName(window.location.pathname.substr(1));
      setChangePathName(false);
    }
  }, [changePathName]);

  return (
    <ThemeProvider theme={ThemeColor}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className={classes.toolbarFlex}>
            <div className={classes.toolbarFlexLeft}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap style={{ display: 'inline' }}>
                {pageTitle}
              </Typography>
            </div>
            <img src={logo} alt="Logo B2B Juris" width="120" />
          </Toolbar>
        </AppBar>
        <BrowserRouter>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <span className={classes.welcome}>
                Olá,&nbsp;
                {user?.name.split(' ')[0]}
              </span>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRight className={classes.icon} />
                ) : (
                  <ChevronLeft className={classes.icon} />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <Link to="/" className={classes.link}>
                <ListItem
                  button
                  onClick={() => {
                    setChangePathName(true);
                    setPageTitle('Home');
                  }}
                  selected={pathName === ''}
                >
                  <ListItemIcon>
                    <Home className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary="Início" />
                </ListItem>
              </Link>

              <ListItem
                button
                className={classes.link}
                onClick={() => setCollapsePatient(!collapsePatient)}
              >
                <ListItemIcon>
                  <img src={patientIcon} alt="Patient Icon" />
                </ListItemIcon>
                <ListItemText primary="Pacientes" />
                {collapsePatient ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={collapsePatient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/pacientes/novos" className={classes.link}>
                    <ListItem
                      button
                      onClick={() => {
                        setChangePathName(true);
                        setPageTitle('Novos Pacientes');
                      }}
                      selected={pathName === 'pacientes/novos'}
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        <Star className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText primary="Novos Pacientes" />
                    </ListItem>
                  </Link>

                  <Link to="/pacientes/pre-aprovados" className={classes.link}>
                    <ListItem
                      button
                      onClick={() => {
                        setChangePathName(true);
                        setPageTitle('Pacientes Pré-Aprovados');
                      }}
                      selected={pathName.startsWith('pacientes/pre-aprovados')}
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        <AssignmentLate className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText primary="Pacientes Pré-Aprovados" />
                    </ListItem>
                  </Link>

                  <Link to="/pacientes/aprovados" className={classes.link}>
                    <ListItem
                      button
                      onClick={() => {
                        setChangePathName(true);
                        setPageTitle('Pacientes Aprovados');
                      }}
                      selected={pathName.startsWith('pacientes/aprovados')}
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        <AssignmentTurnedIn className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText primary="Pacientes Aprovados" />
                    </ListItem>
                  </Link>

                  <Link to="/pacientes/negados" className={classes.link}>
                    <ListItem
                      button
                      onClick={() => {
                        setChangePathName(true);
                        setPageTitle('Pacientes Negados');
                      }}
                      selected={pathName.startsWith('pacientes/negados')}
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        <CancelPresentation className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText primary="Pacientes Negados" />
                    </ListItem>
                  </Link>

                  <Link to="/pacientes/exportar" className={classes.link}>
                    <ListItem
                      button
                      onClick={() => {
                        setChangePathName(true);
                        setPageTitle('Exportar Pacientes');
                      }}
                      selected={pathName.startsWith('pacientes/exportar')}
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        <img src={exportIcon} alt="Export Icon" />
                      </ListItemIcon>
                      <ListItemText primary="Exportar" />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
            </List>

            {user && user.admin && (
              <>
                <Divider />
                <List>
                  <Link to="/usuarios" className={classes.link}>
                    <ListItem
                      button
                      onClick={() => {
                        setChangePathName(true);
                        setPageTitle('Usuários');
                      }}
                      selected={pathName === 'usuarios'}
                    >
                      <ListItemIcon>
                        <Group className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText primary="Usuários" />
                    </ListItem>
                  </Link>
                </List>
              </>
            )}

            <Divider />

            <List className={classes.icon}>
              <ListItem button onClick={() => signOut()}>
                <ListItemIcon>
                  <ExitToApp className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItem>
            </List>
          </Drawer>

          <Routes />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default Menu;
