import {
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { v4 as uuid_v4 } from "uuidv4";
import { ROUTES } from "../../App";
import { signinUser, userSelector } from "../../redux/slices/userSlice";

import { USER_LOGIN, USER_SIGNUP } from "../../services/graphql";
import { useMutation } from "@apollo/client";
import {
  toaster,
  SideSheet,
  Pane,
  Heading,
  TextInputField,
} from "evergreen-ui";
import { Row, Col } from "antd";
import Cookies from "js-cookies";

export default function LoginScreen() {
  const { user } = useSelector(userSelector);
  const { emailAddress, password } = user || {};
  const [emailAddress2, setEmailAddress2] = useState("");
  const [password2, setPassword2] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUp, setShowSignup] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const [loginUser, { loading }] = useMutation(USER_LOGIN, {
    onCompleted: (d) => {
      toaster.success("Login successfull");
      Cookies.setItem("/t", d?.loginUser?.token);
      history.push(ROUTES.dashboard);
      setHasError(false);
      //TODO: Navigate user to verification
    },
    onError: (e) => {
      setHasError(true);
      setErrorMessage("Incorrect login details");
      toaster.danger(e.message);
    },
  });

  const [signupUser, { loading: signing }] = useMutation(USER_SIGNUP, {
    onCompleted: (d) => {
      toaster.success("Login successfull");
      Cookies.setItem("/t", d?.signUpUser?.token);
      history.push(ROUTES.dashboard);
    },
    onError: (e) => toaster.danger(e.message),
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("hi");
    try {
      const payload = {
        email: e.target.emailAddress.value,
        password: e.target.password.value,
      };

      loginUser({ variables: { input: payload } });
    } catch (error) {
      console.log("login error", error);
      // dispatch(setErrorMessage(error.message));
    }
  }

  return (
    <Container className={classes.root} maxWidth="xl">
      <Paper className={classes.paper}>
        <Typography variant="h3" style={{ color: "orangered" }}>
          MShopify
        </Typography>
        <Typography variant="h2" align="center" gutterBottom>
          Log in to your account
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          autoComplete="off"
        >
          <TextField
            className={classes.input}
            label="Email Address"
            name="emailAddress"
            type="email"
            value={emailAddress2}
            onChange={(e) => setEmailAddress2(e.target.value)}
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
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            variant="filled"
            size="medium"
            error={hasError}
            // helperText="Incorrect Password"
          />

          {hasError && (
            <FormHelperText
              style={{ margin: "8px 0" }}
              variant="standard"
              error={hasError}
            >
              {errorMessage}
            </FormHelperText>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <Button
              className={classes.submitBtn}
              variant="contained"
              type="submit"
              color="primary"
              size="large"

              // disabled={!emailAddress || !password}
            >
              Log In
            </Button>
          )}
        </form>

        <Button
          style={{ marginTop: "10px" }}
          onClick={() => setShowSignup(true)}
          variant="contained"
          type="submit"
          color="primary"
          size="large"

          // disabled={!emailAddress || !password}
        >
          Sign Up
        </Button>
      </Paper>
      <SideSheet
        isShown={showSignUp}
        onCloseComplete={() => {
          setShowSignup(false);
        }}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Create Account</Heading>
            <p>Fill the form below to create a profile</p>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={20}>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const payload = {
                lastname: e.target.lastname.value,
                othernames: e.target.othernames.value,
                password: e.target.password.value,
                email: e.target.username.value,
                phonenumber: e.target.phonenumber.value,
              };

              signupUser({ variables: { input: payload } });
            }}
          >
            <Row gutter={[16, 16]}>
              <Col style={{ flex: 1 }}>
                <TextInputField
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  required
                  description="Please enter your lastname"
                  placeholder="eg: Doe"
                />
              </Col>
              <Col style={{ flex: 1 }}>
                <TextInputField
                  id=""
                  label="Other Names"
                  name="othernames"
                  required
                  description="Please enter any other names."
                  placeholder="eg: Jane B."
                />
              </Col>
            </Row>
            <TextInputField
              id="username"
              name="username"
              label="Email Address"
              required
              type="email"
              description="Enter your email address here"
              placeholder="eg: janedoe@gmail.com"
            />
            <TextInputField
              id="phone"
              label="Phone Number"
              name="phonenumber"
              required
              type="number"
              description="Enter your phone here"
              placeholder="eg: +233 548215801"
            />
            <TextInputField
              // id="email"
              label="Password"
              name="password"
              required
              type="password"
              description="Choose a password to protect your account"
              placeholder="eg: *****"
            />

            <Button disabled={signing} type="submit" variant="outlined">
              Submit
            </Button>
            {signing && <CircularProgress size={24} />}
          </form>
        </Pane>
      </SideSheet>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url("https://images.unsplash.com/photo-1570857502809-08184874388e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1398&q=80")`,
    // backgroundColor: "green",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    padding: "50px 50px",

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
