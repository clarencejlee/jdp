import React, {Fragment} from 'react';


// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
    ...theme.styles,
    container: {
        'zIndex': '3000',
        'position': 'fixed',
        'width': '30%',
        'backgroundColor': 'rgba(255, 255, 255, 1)',
        'height': '100px', 'left': '35%',
        'opacity': '0.5',
        'top': '20%',
        'borderRadius': '15px'
    },
    message: {
        'color': 'rgba(0, 0,0, 0,6)',
        'textAlign': 'center',
        'width': '100%',
        'height': '100%',
        'fontSize': '30px'
    }

});
const InfoModal = ({classes, message}) => {

    return (
        <Fragment>
            <div data-html2canvas-ignore className={classes.container}><p className={classes.message}>
                {message}</p></div>
        </Fragment>
    );
};

export default withStyles(styles)(InfoModal);
