import { makeStyles } from '@material-ui/core';

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
  buttons: {
    marginTop: '2rem',
  },
  btn: {
    margin: '0 0.5rem',
  },
}));

export default useStyles;
