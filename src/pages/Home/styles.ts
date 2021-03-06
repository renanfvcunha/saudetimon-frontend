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
  list: {
    display: 'flex',
    justifyContent: 'center',
  },
  listText: {
    fontSize: 16,
    fontWeight: 500,
  },
}));

export default useStyles;
