import React from "react";
import JsonTable from "ts-react-json-table";

import { Link } from "react-router-dom";

const Dashboard = () => {
  const items = [
    {
      id: 75950,
      name: "Louella Wallace",
      age: 24,
      phone: "+44 (0)203 437 7302",
      color: "green",
    },
    {
      id: 80616,
      name: "Hanson Perry",
      age: 36,
      phone: "+44 (0)203 279 3708",
      color: "brown",
    },
    {
      id: 77621,
      name: "Brandi Long",
      age: 20,
      phone: "+44 (0)203 319 4880",
      color: "gray",
    },
    {
      id: 81299,
      name: "Tonia Sykes",
      age: 38,
      phone: "+44 (0)208 328 3671",
      color: "blue",
    },
    {
      id: 14225,
      name: "Leach Durham",
      age: 23,
      phone: "+44 (0)208 280 9572",
      color: "green",
    },
  ];

  return (
    <div>
      <h3>Dashboard</h3>
      <p>
        This is an example customer data. If you want to access real exported
      </p>
      <p>
        Quickbooks data, please <Link to="/subscribe">subscribe</Link> to our
        <Link to="/premium">premium</Link> features
      </p>
      <div style={{ display: "inline-block" }}>
        <JsonTable rows={items} />
      </div>
    </div>
  );
};

export default Dashboard;
