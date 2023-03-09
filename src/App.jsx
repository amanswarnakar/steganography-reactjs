import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Encode from "./components/Encode";
import Decode from "./components/Decode";
import StegoState from "./context/StegoState";

function App() {
  return (
    <div className="App">
      <StegoState>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact index element={<Home />} />
            <Route path="/encode" exact index element={<Encode />} />
            <Route path="/decode" exact index element={<Decode />} />
          </Routes>
        </BrowserRouter>
      </StegoState>
    </div>
  );
}

export default App;
