import { makeStyles } from '@material-ui/core';

import defaultStyles from '../../utils/defaultStyles';

const useStyles = makeStyles({
  contentBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  contentArea: {
    width: '100%',
    backgroundColor: defaultStyles.defaultBoxBackground,
    maxWidth: 1140,
    height: 640,
  },
});

export default useStyles;
