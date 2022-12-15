import { BrowserRouter } from "react-router-dom";

import "antd/dist/antd.css";

import Router from "./router";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
