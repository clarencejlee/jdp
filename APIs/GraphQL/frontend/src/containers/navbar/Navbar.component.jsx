import {
  AppBar,
  Box,
  Button,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../App";
import { logoutUser } from "../../redux/slices/userSlice";
import { useUserDispatch } from "../../redux/store";

export default function Navbar() {
  const dispatch = useUserDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push(ROUTES.login);
  };

  return (
    <>
      <AppBar elevation={1}>
        <Toolbar className={classes.appBar}>
          <Container maxWidth="lg">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to={"/shopify-dashboard"}>
                <Typography
                  style={{ color: "white" }}
                  variant="h6"
                  align="center"
                >
                  MSHOPIFY
                </Typography>
              </Link>
              <Button
                onClick={handleLogout}
                variant="contained"
                color="secondary"
              >
                Log out
              </Button>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
      <Box className={classes.toolbar}></Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  appBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    padding: "16px 0",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
