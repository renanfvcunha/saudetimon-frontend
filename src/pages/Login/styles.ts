import { makeStyles, createTheme } from '@material-ui/core/styles';

import loginBackground from '../../images/loginBackground.png';
import defaultStyles from '../../utils/defaultStyles';

const useStyles = makeStyles(theme => ({
  content: {
    minHeight: '100vh',
    background: `url("${loginBackground}") #27548a`,
    backgroundSize: 'cover',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '85vh',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  input: {
    color: '#e7e7e7',
    '& .MuiInputBase-root': {
      backgroundColor: '#e7e7e7',
    },
  },
  lembrar: {
    color: '#e7e7e7',
    marginLeft: 0,
    '& .MuiCheckbox-root': {
      color: '#e7e7e7',
    },
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Purple = createTheme({
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
