import { createMuiTheme, makeStyles } from '@material-ui/core';
import { green, red, amber } from '@material-ui/core/colors';

import defaultStyles from '../../utils/defaultStyles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: defaultStyles.defaultBackground,
  },
  backBtn: {
    position: 'absolute',
  },
  key: {
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultStyles.purpleLight,
  },
  value: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 500,
  },
  imgThumb: {
    maxWidth: 200,
  },
  actButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  actBtn: {
    margin: '0 4px',
  },
  disapproveMsgField: {
    width: 400,
    marginTop: '1rem',
  },
  mt2: {
    marginTop: '2rem',
  },
  mb1: {
    marginBottom: '1rem',
  },
  mt1: {
    marginTop: '1rem',
  },
  colorRed: {
    color: red['600'],
  },
  colorAmber: {
    color: amber['600'],
  },
  colorGreen: {
    color: green['600'],
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
