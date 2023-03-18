import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div className="home">
      <h1>Steganography</h1>
      <div className="btns">
        {/*  <a href="/encode">
          <button className="btn">Encode</button>
        </a> */}
        <button id="encode-btn" name="encode-btn" style={{ display: "none" }} />
        <label className="btn-outer" htmlFor="encode-btn">
          <div className="btn" onClick={() => navigate("/encode", { replace: true })}>Encode</div>
        </label>
        <button id="decode-btn" name="decode-btn" style={{ display: "none" }} />
        <label className="btn-outer" htmlFor="decode-btn">
          <div className="btn" onClick={() => navigate("/decode", { replace: true })}>Decode</div>
        </label>
        {/* <a href="/decode">
          <button className="btn">Decode</button>
        </a> */}
      </div>
    </div>
  );
};

export default Home;
