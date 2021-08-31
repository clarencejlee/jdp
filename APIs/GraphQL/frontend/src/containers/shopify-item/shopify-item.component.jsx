import {
  Box,
  Container,
  Typography,
  Select,
  InputLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import Navbar from "../navbar/Navbar.component";
import { TabNavigation, Tab } from "evergreen-ui";
import { useLocation, useParams } from "react-router-dom";
import { PageHeader, Button, Descriptions } from "antd";
import queryString from "query-string";
import Orders from "./Screens/Orders";
import Products from "./Screens/Products";

export function ShopifyItem() {
  const classes = useStyles();
  const { pathname, search } = useLocation();
  const { item } = useParams();

  return (
    <Container maxWidth="lg">
      <Navbar />
      <PageHeader
        // ghost={false}
        style={{ marginLeft: -25 }}
        onBack={() => window.history.back()}
        title={item.toUpperCase()}
      ></PageHeader>
      <TabNavigation>
        {["Orders", "Products"].map((tab, index) => (
          <Tab
            key={tab}
            is="a"
            href={`${pathname}?tab=${tab}`}
            id={tab}
            isSelected={tab === queryString.parse(search).tab}
          >
            {tab}
          </Tab>
        ))}
      </TabNavigation>
      {queryString.parse(search).tab === "Orders" ? <Orders /> : <Products />}
    </Container>
  );
}

const useStyles = makeStyles({
  content: {
    paddingTop: "32px",
    display: "flex",
    flexDirection: "column",
  },
  mainDisplay: {
    height: "500px",
    background: "lightgray",
    overflowY: "scroll",
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
