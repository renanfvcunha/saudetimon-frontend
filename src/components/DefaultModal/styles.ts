import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

import defaultStyles from '../../utils/defaultStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      border: `2px solid ${purple['100']}`,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 2, 1),
      backgroundColor: defaultStyles.defaultBoxBackground,
    },
  })
);

export default useStyles;
