const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const fs = require("fs");
const _ = require("underscore");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  let rawData = fs.readFileSync("products.json");
  let data = JSON.parse(rawData);

  res.send(data);
});

app.post("/products", (req, res) => {
  res.send(res.data);
});

app.get("/products/:client", (req, res) => {
  let rawData = fs.readFileSync("products.json");
  let data = JSON.parse(rawData);

  let filtered = _.where(data, { client: req.params.client });

  res.send(filtered);
});

app.get("/users/:id/subscribed", (req, res) => {
  let rawData = fs.readFileSync("users.json");
  let data = JSON.parse(rawData);

  let filtered = _.where(data, { id: parseInt(req.params.id) });

  res.send(filtered[0]);
});

app.get("/users/:id/subscribe", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
