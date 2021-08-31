import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  data,
  fetchItems,
  setItems,
  userSelector,
} from "../../redux/slices/userSlice";
import { useUserDispatch } from "../../redux/store";
import Navbar from "../navbar/Navbar.component";
import { CardItem } from "./CardItem";
import { useQuery, useMutation } from "@apollo/client";
import { USER_CREDENTIALS, USER_AUTH_SHOPIFY } from "../../services/graphql";
import { PageLoader } from "../../components/Loaders";
import {
  Pane,
  SideSheet,
  Heading,
  TextInput,
  TextInputField,
} from "evergreen-ui";

import EmptyImage from "../../assets/images/empty.png";

export default function ShopifyDashboard() {
  const { items } = useSelector(userSelector);
  const dispatch = useUserDispatch();
  const classes = useStyles();

  const [sideSheet, showSideSheet] = useState(false);

  const { loading, data, refetch } = useQuery(USER_CREDENTIALS, {
    onCompleted: (d) => console.log(d),
    onError: (e) => console.log(e),
  });

  const [requestOauth, { loading: requestingOauth }] = useMutation(
    USER_AUTH_SHOPIFY,
    {
      onCompleted: (d) => {
        window.open(d?.requestOauth?.url, "_self");
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  useEffect(() => {
    const fetchShopifyData = () => dispatch(fetchItems());
    // dispatch(getItems());
    fetchShopifyData();
  }, [dispatch]);

  // const renderShopifyItems = () => {
  //   return (
  //     {
  //       items.forEach(item => (

  //         <Box className={classes.gridWrapper}>
  //       <Grid container spacing={2} className={classes.grid}>
  //         <CardItem />

  //       </Grid>
  //     </Box>
  //       ))}
  //   );
  // };

  return (
    <Container style={{}} maxWidth="lg">
      <Navbar />
      {loading ? (
        <PageLoader />
      ) : data?.getCredentials.length > 0 ? (
        <Box className={classes.gridWrapper}>
          <Grid container spacing={2} className={classes.grid}>
            {data?.getCredentials.map((item, index) => (
              <CardItem
                refetch={refetch}
                key={index}
                shop={item?.other_details}
                item={item}
              />
            ))}
          </Grid>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img
              style={{ width: 250, height: 250 }}
              about="Empty"
              src={EmptyImage}
            />
            <Typography className={classes.notFound}>No stores here</Typography>
            <Button
              onClick={() => {
                showSideSheet(true);
              }}
              variant="contained"
              color="secondary"
              style={{ marginLeft: 70, marginTop: 20 }}
            >
              Add Shop
            </Button>
          </div>
        </div>
      )}

      <SideSheet
        // position="left/"
        isShown={sideSheet}
        onCloseComplete={() => {
          showSideSheet(false);
        }}
      >
        <div style={{ paddingTop: "70px" }}>
          <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane padding={16}>
              <Heading size={600}>Add Shop</Heading>
            </Pane>
          </Pane>
          <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const payload = {
                  storeName: e.target.storename.value,
                };
                requestOauth({ variables: { input: payload } });
              }}
            >
              <TextInputField
                required
                name="storename"
                label="Shopify shop name"
                hint="eg: mushud.myshopify.com"
                placeholder="Enter shop name here"
              />
              <Button
                disabled={requestingOauth}
                type="submit"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
              {requestingOauth && <CircularProgress size={24} />}
            </form>
          </Pane>
        </div>
      </SideSheet>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    marginTop: "32px",
  },
  notFound: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  grid: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
  },
}));
