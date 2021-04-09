import { createMuiTheme, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

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
  tableBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  table: {
    width: '100%',
    maxWidth: 1140,
    height: 640,
  },
  selectGroups: {
    position: 'absolute',
    width: '100%',
    maxWidth: 300,
    left: 450,
    top: 5,
  },
  addUserBtn: {
    position: 'absolute',
    top: 12,
    left: 190,
  },
}));

export const ActButtons = createMuiTheme({
  palette: {
    primary: {
      main: red['600'],
    },
    secondary: {
      main: green['600'],
    },
  },
});

export default useStyles;
