import "./App.css";
import JsonTable from "ts-react-json-table";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();

  const fetchData = () => {
    fetch("http://localhost:8000/hubdata")
      .then((res) => res.json())
      .then((data) => setData(data.results.map((x) => x.properties)));
  };

  useEffect(fetchData, []);
  return (
    <div className="App">
      <JsonTable rows={data} />
    </div>
  );
}

export default App;
