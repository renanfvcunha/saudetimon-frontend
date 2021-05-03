import React from 'react';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useStyles from './styles';

interface IModal {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
  scrollable?: boolean;
}

const DefaultModal: React.FC<IModal> = ({
  open,
  close,
  children,
  scrollable = false,
}) => {
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
        <div
          className={clsx(classes.paper, {
            [classes.scrollable]: scrollable,
          })}
        >
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

DefaultModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  scrollable: PropTypes.bool,
};

DefaultModal.defaultProps = {
  scrollable: false,
};

export default React.memo(DefaultModal);
