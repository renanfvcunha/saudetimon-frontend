import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Tooltip, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import DefaultModal from '../../../components/DefaultModal';
import useStyles from './styles';

interface Props {
  open: boolean;
  close: () => void;
}

const Comorbidities: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();

  return (
    <DefaultModal open={open} close={close} scrollable>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        className={classes.boxTitle}
      >
        Comorbidades&nbsp;
        <Tooltip
          title="Nova Comorbidade" /* onClick={() => setModalAddDoubt(true)} */
        >
          <Fab color="primary" size="small">
            <Add />
          </Fab>
        </Tooltip>
      </Typography>
    </DefaultModal>
  );
};

Comorbidities.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Comorbidities;
