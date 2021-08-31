import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import {closeModal, openModal} from './modalActions';


// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";

// Components
import ScreenCapture from "../../app/common/components/ScreenCapture";

//Styles
import './screenshot.css';
import {sendFeedback} from "../dashboard/dashboardActions";
const actions = {
    closeModal,
    openModal,
    sendFeedback
}

const ScreenShotModal = ({closeModal, visible, onCancel, onConfirm, openModal, sendFeedback}) => {

    const [state, setState] = React.useState({
        checked: false,
        text: '',
        backdrop:false,
        screenCapture: ''
    });
    const handleIncludeScreenShot  = name => event => {
        if(!event.target.checked){
            closeModal();
            setState({
                ...state,
                [name]: event.target.checked,
                backdrop: false,
                screenCapture: ''
            })
        }else{
            openModal('InfoModal', {message: 'Drag yellow box to capture screenshot'});
            setState({ ...state,[name]: event.target.checked, backdrop: true});
        }

    }
    const cancelModal= () =>{
        setState({
            ...state,
            checked:false,
            text: '',
            screenCapture: ''
        })

        onCancel()
    }
    const handleSendFeedback =() => {
        sendFeedback(state.screenCapture, state.text);
        setState({
            ...state,
            checked:false,
            text: '',
            screenCapture: ''
        })

        onConfirm()
    }

    const onHandleChange = (e) => {
        setState({
            text: e.target.value
        });
    }

    const handleScreenCapture = (screenCapture) => {
        closeModal();
            setState({
                ...state,
                screenCapture
            })

    }

    return (
        <Dialog
            BackdropProps={{ invisible: state.backdrop }}
            data-html2canvas-ignore
            open={visible}
            keepMounted
            onClose={onCancel}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">Send Feedback</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <TextField
                        autoFocus
                        margin="dense"
                        rows="3"
                        value={state.text}
                        onChange={onHandleChange}
                        id="name"
                        multiline="true"
                        label="Feedback"
                        type="text"
                        fullWidth
                    />
                </DialogContentText>
                <ScreenCapture onEndCapture={handleScreenCapture}>
                    {({ onStartCapture }) => (
                        <Fragment>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checked}
                                            onClick={!state.checked ? onStartCapture:() =>{}}
                                            onChange={handleIncludeScreenShot('checked')}
                                            value="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    }
                                    label="Include Screenshot"
                                />
                            </div>

                            <div className="image__container">
                                {state.screenCapture && (
                                    <img src={state.screenCapture} alt="screen capture" />
                                )}
                            </div>
                        </Fragment>
                    )}
                </ScreenCapture>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSendFeedback} color="primary">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default connect(null, actions)(ScreenShotModal);
