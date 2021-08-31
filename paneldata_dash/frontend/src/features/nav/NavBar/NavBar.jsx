import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Icons
import ErrorIcon from '@material-ui/icons/Error';

//Styles
import './navbar.css';
import {connect, useDispatch} from "react-redux";
import {logout} from "../../auth/authActions";


const styles = (theme) => ({
    ...theme.styles,
    container: {
        justifyContent: 'center'
    },
    toolbar: {
        margin: 'auto',
        marginTop: '7px',
        marginBottom: '15px'
    },
    button: {
        marginRight: '20px',
        minWidth: '112px',
        fontSize: '10px',
        marginTop: '5px'
    },
    activeButton: {
        color: 'green',
        border: '1px solid rgb(63, 191, 63)',
        '&:hover': {
            backgroundColor: 'rgb(63, 191, 63, 0.3)',
            border: '1px solid rgb(63, 191, 63, 1)',
        },
    },
    active: {
        color: '#fff',
        backgroundColor: '#2196f3'
    },
    inactiveButton: {
        color: 'red',
        border: '1px solid rgb(63, 191, 63)',
        '&:hover': {
            backgroundColor: 'rgb(63, 191, 63, 0.3)',
            border: '1px solid rgb(63, 191, 63, 1)',
        },
    },
    error: {
        'marginLeft': '10px',
        'fontSize': '0.8rem'
    },


})



const NavBar = ({
                    classes, selectedMarkets, selectedCategories, selectedBrands, selectedPeriods, selectedFacts, location,
                    showFeedbackModal, auth, logout
                }) => {

    const dispatch = useDispatch();
    const isActive = (path) => {
        return location.pathname.includes(path);
    }
    const handleLogout = () => {
        dispatch(logout);
    }

    const styledFeedbackButton = [classes.button, "feedback"];
    return (
        <Toolbar className={classes.toolbar}>
            <Grid container spacing={0} justify="space-between" className={classes.container}>
                <Grid item md={12} xs={4}>
                    <div>
                        <Button activeClassName={classes.active}
                                className={[classes.button, selectedMarkets ? classes.activeButton : classes.empty]}
                                variant="outlined" color="inherit"
                                component={NavLink} to='/dashboard/data/markets'
                                name='Markets'>Markets {!selectedMarkets && !isActive('/dashboard/data/markets') ?
                            <ErrorIcon className={classes.error} color="secondary" fontSize="small"/> : ''}</Button>

                        <Button activeClassName={classes.active}
                                className={[classes.button, selectedCategories ? classes.activeButton : classes.empty]}
                                variant="outlined" color="inherit"
                                component={NavLink} to='/dashboard/data/categories'
                                name='Category'>Category {!selectedCategories && !isActive('/dashboard/data/categories') ?
                            <ErrorIcon className={classes.error} color="secondary" fontSize="small"/> : ''}</Button>

                        <Button activeClassName={classes.active}
                                className={[classes.button, selectedBrands ? classes.activeButton : classes.empty]}
                                variant="outlined" color="inherit"
                                component={NavLink} to='/dashboard/data/brands'
                                name='Brand'>Brand {!selectedBrands && !isActive('/dashboard/data/brands') ?
                            <ErrorIcon className={classes.error} color="secondary" fontSize="small"/> : ''}</Button>

                        <Button activeClassName={classes.active}
                                className={[classes.button, selectedPeriods ? classes.activeButton : classes.empty]}
                                variant="outlined" color="inherit"
                                component={NavLink} to='/dashboard/data/periods'
                                name='Periods'>Periods {!selectedPeriods && !isActive('/dashboard/data/periods') ?
                            <ErrorIcon className={classes.error} color="secondary" fontSize="small"/> : ''}</Button>

                        <Button activeClassName={classes.active}
                                className={[classes.button, selectedFacts && !isActive('/dashboard/data/facts') ? classes.activeButton : classes.empty]}
                                style={{'marginRight': '0'}} variant="outlined"
                                color="inherit"
                                component={NavLink} to='/dashboard/data/facts'
                                name='Facts'>Facts {!selectedFacts && !isActive('/dashboard/data/facts') ?
                            <ErrorIcon className={classes.error} color="secondary" fontSize="small"/> : ''}</Button>

                        {auth.authenticated ? <Button className={styledFeedbackButton.join(' ')} onClick={handleLogout} color="primary">Logout</Button>:null}
                        <Button className={styledFeedbackButton.join(' ')} onClick={showFeedbackModal} color="primary">Send
                            Feedback</Button>

                    </div>


                </Grid>


            </Grid>


        </Toolbar>
    );
}

const actions ={
    logout
}
const mapState = state => ({
    auth: state.auth,
    loading: state.async.loading
});

export default withRouter(connect(mapState, actions)(withStyles(styles)(NavBar)));
