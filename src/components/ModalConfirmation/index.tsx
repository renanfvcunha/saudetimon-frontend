import React from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

interface Modal {
  open: boolean;
  close: () => void;
  confirmAction?: () => void;
  title?: string;
  msg: string | JSX.Element;
  loading?: boolean;
  cancel: string;
  confirm: string;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ModalConfirmation: React.FC<Modal> = ({
  open,
  close,
  confirmAction,
  title,
  msg,
  loading = false,
  cancel,
  confirm,
}) => (
  <div>
    <Dialog
      open={open}
      onClose={close}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{msg}</DialogContentText>
      </DialogContent>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={24} />
        </div>
      )}
      <DialogActions>
        <Button autoFocus onClick={close} color="secondary" disabled={loading}>
          {cancel}
        </Button>
        <Button onClick={confirmAction} color="primary" disabled={loading}>
          {confirm}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ModalConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  confirmAction: PropTypes.func,
  title: PropTypes.string,
  msg: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  loading: PropTypes.bool,
  cancel: PropTypes.string.isRequired,
  confirm: PropTypes.string.isRequired,
};

ModalConfirmation.defaultProps = {
  title: '',
  confirmAction: () => {},
  loading: false,
};

export default React.memo(ModalConfirmation);
