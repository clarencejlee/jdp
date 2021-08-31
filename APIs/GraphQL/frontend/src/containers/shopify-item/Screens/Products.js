import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { SHOPIFY_PRODUCTS } from "../../../services/graphql";
import { Card, Avatar, Row, Col, Statistic } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Alternate } from "../../../components/Loaders";
import { Pane } from "evergreen-ui";

export default function Products() {
  const { loading, data } = useQuery(SHOPIFY_PRODUCTS, {
    onCompleted: (d) => console.log(d),
  });
  return (
    <Fragment>
      <Pane
        flex="1"
        overflowY="scroll"
        style={{ marginTop: 20 }}
        
      >
        {loading ? (
          <Alternate />
        ) : (
          <Row style={{height: '100vh', marginRight: "100px"}} gutter={[10, 10]}>
            {data?.getShopifyProducts.map((item) => (
              <Col>
                <Card
                  hoverable
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src={
                        item?.image ||
                        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      }
                    />
                  }
                  extra={
                    <div>
                      <Statistic
                        prefix={"$"}
                        valueStyle={{color: 'grey'}}
                        value={item?.variants[0]?.price}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    avatar={
                      <Avatar shape="square">{item?.variants.length}</Avatar>
                    }
                    title={item?.title}
                    description={item?.body_html}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Pane>
    </Fragment>
  );
}
