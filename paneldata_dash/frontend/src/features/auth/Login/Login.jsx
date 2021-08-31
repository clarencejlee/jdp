import React, {Fragment, useEffect} from 'react';
import {Redirect} from "react-router";
// MUI stuff
import Button from '@material-ui/core/Button'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {authenticate, login} from "../authActions";
import { withRouter } from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import * as qs from 'query-string';
import LoadingComponent from "../../../app/layout/LoadingComponent";

const styles = (theme) => ({
    ...theme.styles,
    container: {
        textAlign: 'center'
    },
    header: {
        marginBottom: '10px',
        fontWeight: 900,
        color: '#fff'
    },
    arrowButton: {
        fontSize: '24px',
        fontWeight: 900,
        border: '1px solid #fff',
        color:'#fff',
        '&:hover': {
            background: "#fff",
            color: 'rgba(0, 0, 0, 0.75)'
        },
    }

});

const actions = {
    login,
    authenticate
};
const mapState = state => ({
    auth: state.auth,
    loading: state.async.loading
});

const Login = ({history, classes, login,  location, auth, loading}) => {
    const dispatch = useDispatch();
    const token = qs.parse(location.search);


    const loginHandler = () => {
        dispatch(login)
    }

    //redirect
    useEffect(() => {
        if(auth.redirectUri){
            window.location.replace(auth.redirectUri);
        }

    }, [ auth]);
    //authenticate
    useEffect(() => {
        if(token.token){
            dispatch(authenticate(token.token))
        }

    }, [dispatch, token.token]);

    if (auth.authenticated) {
        return <Redirect to='/dashboard'/>;
    }

    return (
        <div className="masthead">
            {loading ? <LoadingComponent />:null}
            <Container className={classes.container}>
                <Typography variant="h3" className={classes.header}>
                    Johnson Scanner Data
                </Typography>

                <Button fontWeight="Bold" className={classes.arrowButton} onClick={loginHandler} variant="outlined" size='large'>
                    Login with Cornell
                    <ArrowForwardIcon fontWeight="Bold"/>
                </Button>
            </Container>

        </div>
    );
};

export default withRouter(connect(
    mapState,
    actions
)((withStyles(styles)(Login))));
