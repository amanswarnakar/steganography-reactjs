import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Encode from "./components/Encode";
import Decode from "./components/Decode";
import StegoState from "./context/StegoState";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <StegoState>
        <BrowserRouter>
          <Navbar />
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
