import { createMuiTheme, makeStyles } from '@material-ui/core';
import { orange, red } from '@material-ui/core/colors';

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
  comorbidityContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  comorbidity: {
    width: 250,
    margin: '0 16px',
    fontSize: 16,
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

export default useStyles;
