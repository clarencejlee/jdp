import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";
import JsonTable from "ts-react-json-table";

function App() {
  const [data, setData] = useState();

  const fetchData = () => {
    const test = [];
    fetch("http://localhost:8000/qbdata")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.result);
      });
  };

  useEffect(fetchData, []);

  const tableData = data && data.map((obj) => obj.QBExport);
  console.log(tableData);

  return (
    <div className="App">
      <JsonTable rows={tableData} />
    </div>
  );
}

export default App;
