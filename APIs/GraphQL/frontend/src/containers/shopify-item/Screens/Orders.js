import { Pane, Table, Dialog } from "evergreen-ui";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { SHOPIFY_ORDERS } from "../../../services/graphql";
import { Alternate } from "../../../components/Loaders";
import moment from "moment";
import {
  Button,
  Col,
  Card,
  Row,
  Typography,
  Divider,
  Tag,
  List,
  Avatar,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";

export default function Orders() {
  const { loading, data } = useQuery(SHOPIFY_ORDERS, {
    onCompleted: (d) => {
      //   console.log(d.getShopifyOrders);
    },
  });

  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <Pane
      flex="1"
      overflowY="scroll"
      style={{ marginTop: 20 }}
      background="tint1"
    >
      <Dialog
        hasHeader={false}
        preventBodyScrolling
        title="Order Details"
        hasFooter={false}
        onCloseComplete={() => setShowDetails(false)}
        width={window.screen.width - 200}
        isShown={showDetails}
      >
        <Row gutter={[10, 10]}>
          <Col md={8}>
            <Card>
              <Typography.Title level={4}>Customer</Typography.Title>
              {selectedOrder?.customer ? (
                <div>
                  <Typography.Text>
                    {selectedOrder?.customer?.email}
                  </Typography.Text>
                </div>
              ) : (
                <div>No customer Information</div>
              )}
              <Divider />
              <Typography.Title level={4}>Contact Information</Typography.Title>
              <div>
                <Typography.Text>
                  {selectedOrder?.email || "No Email provided "}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {selectedOrder?.email || "No Phone number"}
                </Typography.Text>
              </div>
              <Divider />
              <Typography.Title level={4}>Billing Address</Typography.Title>
              <Typography.Text>
                {selectedOrder?.billing_address ||
                  "No billinng address provided "}
              </Typography.Text>
            </Card>
          </Col>
          <Col md={16}>
            <Card
              extra={<Tag>{selectedOrder?.financial_status}</Tag>}
              title={"#" + selectedOrder?.order_number}
            >
              {selectedOrder?.line_items.map((item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: "orange" }}>
                        {item?.quantity}
                      </Avatar>
                    }
                    title={<Typography.Text>{item?.title}</Typography.Text>}
                    description={selectedOrder?.currency + " "+ item?.price + " x " + item?.quantity}
                  />
                </List.Item>
              ))}
            </Card>
          </Col>
        </Row>
      </Dialog>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Order ID</Table.TextHeaderCell>
          <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
          <Table.TextHeaderCell>Financial Status</Table.TextHeaderCell>
          <Table.TextHeaderCell>Total Price</Table.TextHeaderCell>
          <Table.TextHeaderCell>Note</Table.TextHeaderCell>
          <Table.TextHeaderCell>Created At</Table.TextHeaderCell>
          <Table.TextHeaderCell>Action</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {loading ? (
            <Alternate />
          ) : (
            data?.getShopifyOrders.map((item) => (
              <Table.Row key={item?.id}>
                <Table.TextCell>{item?.id}</Table.TextCell>
                <Table.TextCell>{item?.number}</Table.TextCell>
                <Table.TextCell>{item?.financial_status}</Table.TextCell>
                <Table.TextCell>
                  {item?.currency} {item?.total_price}
                </Table.TextCell>
                <Table.TextCell>{item?.note}</Table.TextCell>
                <Table.TextCell>
                  {moment(item?.created_at).calendar()}
                </Table.TextCell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      setShowDetails(true);
                      setSelectedOrder(item);
                    }}
                    shape="circle"
                  >
                    <EyeOutlined />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </Pane>
  );
}
