import { createMuiTheme, makeStyles } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  boxTitle: {
    margin: '1rem 0',
  },
  backBtn: {
    position: 'absolute',
  },
  frequentDoubts: {
    minWidth: 500,
    maxWidth: 1140,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  doubtsCard: {
    width: '80%',
    marginBottom: '1rem',
  },
  doubtsActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  pb0: {
    paddingBottom: 0,
  },
}));

export const doubtActionsBtns = createMuiTheme({
  palette: {
    primary: {
      main: blue['500'],
    },
    secondary: {
      main: red['500'],
    },
  },
});

export default useStyles;
