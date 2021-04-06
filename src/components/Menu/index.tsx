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
  ExpandMore,
  ExpandLess,
  NewReleases,
} from '@material-ui/icons';

import useStyles, { ThemeColor } from './styles';
import Routes from '../../routes';
import authContext from '../../contexts/authContext';
import logoGED from '../../images/logoGED.png';
import oldmanIcon from '../../images/icons/oldmanIcon.svg';
import vaccineIcon from '../../images/icons/vaccineIcon.svg';

const Menu: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { user, signOut } = useContext(authContext);

  const [open, setOpen] = useState(false);
  const [changePathName, setChangePathName] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pathName, setPathName] = useState('');
  const [expandPatients, setExpandPatients] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    setPathName(window.location.pathname.split('/')[1]);
  }, []);

  useLayoutEffect(() => {
    if (changePathName) {
      setPathName(window.location.pathname.split('/')[1]);
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
            <img src={logoGED} alt="Logo B2B Juris" width="60" height="60" />
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
                onClick={() => setExpandPatients(!expandPatients)}
                className={classes.link}
              >
                <ListItemIcon>
                  <NewReleases className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Novos Pacientes" />
                {expandPatients ? (
                  <ExpandLess className={classes.icon} />
                ) : (
                  <ExpandMore className={classes.icon} />
                )}
              </ListItem>

              <Collapse in={expandPatients}>
                <List disablePadding>
                  <Link to="/oldman" className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <img src={oldmanIcon} alt="OldmanIcon" />
                      </ListItemIcon>
                      <ListItemText primary="Idosos Acamados" />
                    </ListItem>
                  </Link>

                  <Link to="/leftover" className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <img src={vaccineIcon} alt="OldmanIcon" />
                      </ListItemIcon>
                      <ListItemText primary="Sobra de Vacinas" />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
            </List>

            {user && user.admin && (
              <>
                <Divider />
                <List>
                  <Link to="/users" className={classes.link}>
                    <ListItem
                      button
                      onClick={() => {
                        setChangePathName(true);
                        setPageTitle('Usuários');
                      }}
                      selected={pathName === 'users'}
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
