import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
  Paper,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { isEqual } from "lodash";
import { useSelector } from "react-redux";

import { ROUTES } from "../../App";
import { userSelector } from "../../redux/slices/userSlice";

export function VerifyShopifyData() {
  const {user:{emailAddress,password}} = useSelector(userSelector);
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleVerifyDetails = () => {
    // Compare details with existing login details
    // Return error if they do not match
    const matchEmail = isEqual(newEmailAddress, emailAddress);
    const matchPassword = isEqual(newPassword, password);
    

    if (matchEmail && matchPassword) {
      history.push(ROUTES.dashboard);
    }
    setHasError(true);
    setErrorMessage("Invalid shopify credentials");
  };

  return (
    <Container maxWidth="xs">
      <Paper className={classes.root}>
        <Box className={classes.header}>
          <Typography variant="h4" gutterBottom>
            Verify Shopify Data
          </Typography>
          <Typography variant="body1" color="textSecondary">
            It seems you have not been given access to your shopify account yet
          </Typography>
        </Box>
        <Box className={classes.content}>
          <TextField
            className={classes.input}
            onChange={(e) => setNewEmailAddress(e.target.value)}
            label="Email Address"
            name="emailAddress"
            type="email"
            variant="filled"
            size="medium"
            error={hasError}
            // helperText={errorMessage}
          />
          <TextField
            className={classes.input}
            onChange={(e) => setNewPassword(e.target.value)}
            label="Password"
            name="password"
            type="password"
            variant="filled"
            size="medium"
            error={hasError}
            // helperText="Incorrect Email"
          />

          <FormHelperText
            style={{ margin: "8px 0" }}
            variant="standard"
            error={hasError}
          >
            {errorMessage}
          </FormHelperText>
          <Button
            onClick={handleVerifyDetails}
            variant="contained"
            color="primary"
            size="large"
          >
            Verify Details
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: "24px 24px",
    margin: "64px auto",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
  header: {
    margin: "24px 0",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    margin: "24px 0",
  },
  input: { margin: "8px 0" },
});
