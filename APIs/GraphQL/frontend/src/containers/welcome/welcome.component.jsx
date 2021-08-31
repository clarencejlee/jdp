import {
  Box,
  Typography,
  Container,
  Button,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserDispatch } from "../../redux/store";
import { signinUser, userSelector } from "../../redux/slices/userSlice.js";
import { ROUTES } from "../../App";

export function WelcomeScreen() {
  // const user = useSelector(userSelector);
  const {
    user: { emailAddress, password },
  } = useSelector(userSelector);
  const dispatch = useUserDispatch();
  const history = useHistory();
  const classes = useStyles();

  const navigateToVerifyData = () => {
    // console.log("user from welcome ", emailAddress);
    history.push(ROUTES.verifyAccount);
  };

  return (
    <Container className={classes.root} maxWidth="xs">
      <Typography variant="h4">Welcome {emailAddress}</Typography>
      <Box className={classes.content}>
        <Typography variant="h5" gutterBottom>
          What do you want to do?
        </Typography>

        <Button
          className={classes.btn}
          onClick={navigateToVerifyData}
          variant="outlined"
          color="secondary"
          size="large"
        >
          View Shopify Data
        </Button>
        <Button
          className={classes.btn}
          variant="outlined"
          color="secondary"
          size="large"
        >
          View QuickBooks Data
        </Button>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    padding: "16px 0",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  btn: {
    margin: "8px 0",
  },
});
