import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { green, orange, red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  boxTitle: {
    margin: '1rem 0',
  },
  backBtn: {
    position: 'absolute',
  },
  wd500: {
    width: 500,
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: '1rem',
  },
  maxWd286: {
    maxWidth: 286,
  },
}));

export const btnGreen = createMuiTheme({
  palette: {
    primary: {
      main: green['800'],
    },
  },
});

export const actionButtons = createMuiTheme({
  palette: {
    primary: {
      main: orange['800'],
    },
    secondary: {
      main: red['800'],
    },
  },
});

export default useStyles;
