import React from 'react';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './styles';

interface IModal {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

const DefaultModal: React.FC<IModal> = ({ open, close, children }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="new-user-modal-title"
      aria-describedby="new-user-modal-description"
      className={classes.modal}
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>{children}</div>
      </Fade>
    </Modal>
  );
};

DefaultModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default React.memo(DefaultModal);
