import { createMuiTheme, makeStyles } from '@material-ui/core';
import { green, orange, red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  boxTitle: {
    margin: '1rem 0',
  },
  backBtn: {
    position: 'absolute',
  },
  content: {
    minWidth: 500,
    maxWidth: 1140,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  items: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemBox: {
    width: 250,
    margin: '0 16px',
    display: 'flex',
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 500,
  },
  helperText: {
    marginTop: 4,
    fontSize: 16,
    color: '#666',
    fontWeight: 500,
  },
  divider: {
    width: '70%',
    margin: '10px 0',
  },
}));

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

export const confirmationBtns = createMuiTheme({
  palette: {
    primary: {
      main: red['500'],
    },
    secondary: {
      main: green['500'],
    },
  },
});

export default useStyles;
