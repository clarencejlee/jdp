import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import JsonTable from "ts-react-json-table";
import { useStore } from "../Stores/rootStore";
import { Link } from "react-router-dom";

const QBTable = () => {
  const store = useStore();
  const [data, setData] = useState<QBData[]>([]);

  const fetchData = () => {
    fetch("http://localhost:8000/qbdata")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.result);
      });
  };

  useEffect(fetchData, []);

  const tableData = data && data.map((obj) => obj.QBExport);

  return (
    <div>
      <h3>Quickbooks premium data</h3>
      {store.subscribed ? (
        <div>
          <p>
            <Link to="/">Home</Link>
          </p>
          <JsonTable rows={tableData} />
        </div>
      ) : (
        <p>
          Please <Link to="/subscribe">subscribe</Link> in order to gain access
          to premium data
        </p>
      )}
    </div>
  );
};

export default observer(QBTable);
