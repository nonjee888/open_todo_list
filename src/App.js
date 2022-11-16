import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Detail from "./pages/Detail";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path=":id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
