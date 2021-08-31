import React, {Fragment} from 'react';

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Icons
import ImageIcon from '@material-ui/icons/CloudUpload';

// Components

// Redux
import {connect} from 'react-redux';
import {
    uploadCsv
} from "../dashboardActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";


const styles = (theme) => ({
    ...theme.styles,
    uploadButton: {
        position: 'fixed',
        top: '40%',
        left: '50%',
    }
});

const mapState = state => ({
    loading: state.async.loading
});

const actions = {
    uploadCsv
};

const CsvUpload = ({classes, uploadCsv, loading}) => {


    const handleUploadFile = (file) => {
        uploadCsv(file.currentTarget.files[0]);
    }
    return (
        <Fragment>
            {loading ? <LoadingComponent />:null};
            <Grid container spacing={3}>
                <Grid item className={classes.uploadButton}>
                    <input
                        color="primary"
                        accept="text/csv/*"
                        type="file"
                        onChange={handleUploadFile}
                        id="icon-button-file"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="icon-button-file">
                        <Button
                            variant="contained"
                            component="span"
                            className={classes.button}
                            size="large"
                            color="primary">
                            <ImageIcon className={classes.extendedIcon} />
                        </Button>
                    </label>
                </Grid>
            </Grid>
        </Fragment>
    );
};


export default connect(
    mapState,
    actions,

)(withStyles(styles)(CsvUpload));
