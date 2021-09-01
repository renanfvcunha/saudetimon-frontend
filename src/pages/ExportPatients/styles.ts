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
  boxRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  box: {
    minWidth: 400,
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: 8,
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
  },
  mt1: {
    marginTop: '1rem',
  },
  period: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  mt05: {
    marginTop: '0.5rem',
  },
  progress: {
    alignSelf: 'center',
    marginTop: '1rem',
  },
}));

export default useStyles;
