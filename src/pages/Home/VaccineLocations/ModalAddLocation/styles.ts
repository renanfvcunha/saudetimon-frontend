import { createMuiTheme, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  inputs: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
  },
  input: {
    marginBottom: '1rem',
  },
  pictureArea: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    position: 'relative',
    width: 120,
  },
  picture: {
    width: 70,
    height: 70,
  },
  btnClearPicture: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  btnClearPictureIcon: {
    width: 18,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const buttonsTheme = createMuiTheme({
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
