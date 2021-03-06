import { makeStyles, createStyles, createTheme } from '@material-ui/core';

import defaultStyles from '../../utils/defaultStyles';

interface Props {
  increaseWidth: boolean;
}

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: (props: Props) =>
        props.increaseWidth ? drawerWidth + 40 : drawerWidth,
      width: (props: Props) =>
        props.increaseWidth
          ? `calc(100% - ${drawerWidth + 40}px)`
          : `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbarFlex: {
      display: 'flex',
      justifyContent: 'center',
    },
    toolbarFlexLeft: {
      position: 'absolute',
      left: 16,
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      minHeight: '100vh',
    },
    drawerOpen: {
      width: (props: Props) =>
        props.increaseWidth ? drawerWidth + 40 : drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: defaultStyles.purpleLight,
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
      backgroundColor: defaultStyles.purpleLight,
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
    },
    icon: {
      color: '#fff',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    welcome: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 5,
      color: '#fff',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export const ThemeColor = createTheme({
  palette: {
    primary: {
      main: defaultStyles.purpleLight,
    },
  },
});

export default useStyles;
