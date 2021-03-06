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
  msgAlign: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

export default useStyles;
