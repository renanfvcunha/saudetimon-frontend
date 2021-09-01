import {
  makeStyles,
  Theme,
  createStyles,
  createTheme,
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import defaultStyles from '../../../utils/defaultStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      border: `2px solid ${green['100']}`,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 2, 1),
      backgroundColor: defaultStyles.defaultBoxBackground,
    },
    backBtn: {
      position: 'absolute',
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      width: 800,
    },
    formBox: {
      borderRadius: 12,
      width: '100%',
    },
    formRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 'bold',
      margin: theme.spacing(1),
    },
    field: {
      margin: theme.spacing(1),
    },
    radioButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progress: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    subButton: {
      margin: theme.spacing(1),
      marginTop: 8,
    },
  })
);

export const Green = createTheme({
  palette: {
    primary: {
      main: defaultStyles.purpleDark,
    },
    secondary: {
      main: defaultStyles.purpleLight,
    },
  },
});

export default useStyles;
