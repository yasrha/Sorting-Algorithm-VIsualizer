import "./App.css";
import React from "react";
import Line from "./components/line.js";
import BarsArray from "./components/barsArray";

function App() {
  // Initialize with an empty function

  return (
    <div className="App">
      <BarsArray />
      <Line />
    </div>
  );
}

export default App;
