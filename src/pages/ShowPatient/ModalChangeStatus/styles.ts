import { createMuiTheme, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  msgField: {
    marginTop: '1rem',
  },
  loading: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  mt1: {
    marginTop: '1rem',
  },
}));

export const ActButtons = createMuiTheme({
  palette: {
    primary: {
      main: green['600'],
    },
    secondary: {
      main: red['600'],
    },
  },
});

export default useStyles;
