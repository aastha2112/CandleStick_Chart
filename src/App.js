import React, { useState } from "react";
import BarChart from "./components/BarChart";
import LineChart from "./components/BarChart";
import CandlestickChart from "./components/BarChart";

const initialData = [
  { name: "A", value: 30 },
  { name: "B", value: 80 },
  { name: "C", value: 45 },
  { name: "D", value: 60 },
  { name: "E", value: 20 },
  { name: "F", value: 90 },
];

function App() {
  const [data, setData] = useState(initialData);

  const updateData = () => {
    const newData = data.map((d) => ({
      ...d,
      value: Math.floor(Math.random() * 100),
    }));
    setData(newData);
  };

  return (
    <div>
      <CandlestickChart data={data} />
    </div>
  );
}

export default App;
