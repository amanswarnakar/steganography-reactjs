import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StegoContext from "../context/StegoContext.js";

const Encode = () => {
  let navigate = useNavigate();
  const a = useContext(StegoContext);
  const handleSecret = (e) => {
    a.setSecret(e.target.value);
  };
  useEffect(() => {
    console.log(a);
  }, []);

  console.log(a);
  return (
    <div className="encode">
      <h1>Encode</h1>
      <div className="secret-message">
        <h3>Enter Secret Message to Enocde: &nbsp; </h3>
        <input
          type="text"
          placeholder="Secret Message..."
          onChange={handleSecret}
        />
      </div>
      <label className="btn" htmlFor="upload-image">
        <input
          type="file"
          id="upload-image"
          name="upload-image"
          onChange={a.loadImage}
          style={{ display: "none" }}
        />
        <div>Upload Image</div>
      </label>
      <p>{a.msg}</p>
      <button className="btn" onClick={a.encode}>
        Encode
      </button>
      <button
        className="btn"
        onClick={() => navigate("/", { replace: true })}
      >
        Return to Home Page
      </button>
      <img
        style={{ display: "none"}}
        id="encoded-image"
        alt="encoded output"
      ></img>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Encode;
