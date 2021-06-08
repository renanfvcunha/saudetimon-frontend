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
    minHeight: 640,
  },
  selects: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  selectCategories: {
    width: 250,
  },
  selectGroups: {
    marginLeft: 12,
    width: 250,
  },
}));

export const confirmationBtns = createMuiTheme({
  palette: {
    primary: {
      main: green['500'],
    },
    secondary: {
      main: red['500'],
    },
  },
});

export default useStyles;
