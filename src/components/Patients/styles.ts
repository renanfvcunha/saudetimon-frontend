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
}));

export default useStyles;
