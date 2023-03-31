import React, { useState } from "react";
import "./App.css";
import SimplePage from "./example/simple";
import PullPage from "./example/pull";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="App">
      <ul className="AppHeader">
        <li>
          <a href="#" onClick={() => setActiveIndex(0)}>
            1.简单案例
          </a>
        </li>
        <li>
          <a href="#" onClick={() => setActiveIndex(1)}>
            2.上拉下拉加载
          </a>
        </li>
      </ul>
      <div className="AppContent">
        {activeIndex === 0 ? <SimplePage /> : <PullPage />}
      </div>
    </div>
  );
}

export default App;
