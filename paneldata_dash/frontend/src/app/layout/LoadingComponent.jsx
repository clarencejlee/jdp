import React from 'react'
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    loading: {
        position: 'fixed',
        left: '50%',
        top: '40%',
        zIndex: 3000
    }
}));

const LoadingComponent = (props) => {
    const classes = useStyles();
  return (
      <Backdrop className={classes.backdrop} open={true} >
          <CircularProgress className={classes.loading} color="inherit" />
      </Backdrop>
  )
}

export default LoadingComponent
