import React from 'react';

// MUI stuff
import Button from '@material-ui/core/Button'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {logout} from "../auth/authActions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Redirect} from "react-router";

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
const HomePage = ({history, classes, auth}) => {
    if(!auth.authenticated){
        return <Redirect to="/login"/>
    }
    return (
       <div className="masthead">
           <Container className={classes.container}>
               <Typography variant="h3" className={classes.header}>
                   Johnson Scanner Data
               </Typography>

               <Button fontWeight="Bold" className={classes.arrowButton} onClick={() => history.push('/dashboard')} variant="outlined" size='large'>
                   Dashboard
                   <ArrowForwardIcon fontWeight="Bold"/>
               </Button>
           </Container>

       </div>
    );
};


const actions ={
    logout
}
const mapState = state => ({
    auth: state.auth,
    loading: state.async.loading
});

export default withRouter(connect(mapState, actions)(withStyles(styles)(HomePage)));
