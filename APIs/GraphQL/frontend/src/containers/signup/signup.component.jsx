import {
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { v4 as uuid_v4 } from "uuidv4";
import { ROUTES } from "../../App";
import { signinUser as signupUser, userSelector } from "../../redux/slices/userSlice";
import { useUserDispatch } from "../../redux/store";

export function SignupScreen() {
  // const {  } = useSelector(userSelector);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useUserDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = () => {
    try {
      // get user data and sign up
      const newUser = { emailAddress, password };

      if (emailAddress === "" && password === "") {
        setHasError(true);
        setErrorMessage("Please provide your signup details");
        return null;
      }
      dispatch(signupUser(newUser));
      history.push(ROUTES.login);
    } catch (error) {
      console.log("signup error", error);
      
    }
  };

  return (
    <Container className={classes.root} maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center" gutterBottom>
          Create an account
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            className={classes.input}
            label="Email Address"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            variant="filled"
            size="medium"
            error={hasError}
            // helperText="Incorrect Email"
          />
          <TextField
            className={classes.input}
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            size="medium"
            error={hasError}
            // helperText="Incorrect Password"
          />

          <FormHelperText
            style={{ margin: "8px 0" }}
            variant="standard"
            error={hasError}
          >
            {errorMessage}
          </FormHelperText>

          <Button
            className={classes.submitBtn}
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            size="large"
            // disabled={!emailAddress || !password}
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
  },
  paper: {
    display: "flex",
    padding: "24px 24px",

    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    margin: "8px 0",
  },
  submitBtn: {
    marginTop: "32px",
  },
});
