import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Row, Col, Button, Popconfirm } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "../../App";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { USER_REMOVE_CREDENTIAL } from "../../services/graphql";
import { toaster } from "evergreen-ui";

export const CardItem = ({ shop, item, refetch }) => {
  const history = useHistory();
  const {} = useLocation;
  const classes = useStyles();
  console.log(refetch);

  const [removeCredential, { loading }] = useMutation(USER_REMOVE_CREDENTIAL, {
    onCompleted: (d) => {
      toaster.success("Shop removed successfully");
      refetch();
    },
    onError: (e) => toaster.danger(e.message),
  });

  return (
    <Grid item xs={6} sm={6} md={3} lg={4}>
      <Card>
        <CardActionArea component="div" disableRipple>
          <CardMedia
            className={classes.media}
            image={
              "https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
            }
            title={shop}
          />
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <Typography style={{ color: "grey" }}>{shop}</Typography>
                <Typography variant="h5">Shopify</Typography>
              </div>
              <Row>
                <Col>
                  <Popconfirm
                    title="Do you want remove this shop from your account?"
                    onConfirm={() => {
                      // alert("Delete");
                      removeCredential({
                        variables: { input: { _id: item?._id } },
                      });
                    }}
                  >
                    <Button loading={loading} shape="circle">
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>

                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/shopify-dashboard/" + shop +"?tab=Orders"}
                  >
                    <Button style={{ marginLeft: 5 }} shape="circle">
                      <EyeOutlined />
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
const useStyles = makeStyles({
  header: {
    display: "flex",
    padding: "16px 0",
    justifyContent: "space-between",
    alignItems: "center",
  },
  media: { height: "140px" },
  gridWrapper: {
    marginTop: "32px",
  },
  grid: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
  },
});
