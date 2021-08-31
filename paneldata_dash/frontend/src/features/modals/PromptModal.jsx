import React from 'react';
import {connect} from 'react-redux'
import {closeModal} from './modalActions';

// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const actions = {
  closeModal
}

const PromptModal = ({closeModal, message, visible, onCancel, onConfirm}) => {

  return (
      <Dialog
          open={visible}
          keepMounted
          onClose={onCancel}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          {/*<DialogTitle id="alert-dialog-slide-title">Title</DialogTitle>*/}
          <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                  {message}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={onCancel} color="primary">
                  Cancel
              </Button>
              <Button onClick={onConfirm} color="primary">
                  OK
              </Button>
          </DialogActions>
      </Dialog>
  );
};

export default connect(null, actions)(PromptModal);
