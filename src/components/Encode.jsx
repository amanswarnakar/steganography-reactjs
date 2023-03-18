import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StegoContext from "../context/StegoContext.js";

const Encode = () => {
  let navigate = useNavigate();
  const a = useContext(StegoContext);
  const handleSecret = (e) => {
    a.setSecret(e.target.value);
  };
  // useEffect(() => {
  //   console.log(a);
  // }, []);

  // console.log(a);
  return (
    <div className="encode">
      <h1>Encode</h1>
      <div className="secret-message">
        <h3>Enter Secret Message to Enocde:</h3>
        <input
          className="input-secret"
          type="text"
          placeholder="Secret Message..."
          value={a.secret}
          onChange={handleSecret}
        />
      </div>
      <input
        type="file"
        id="upload-image"
        name="upload-image"
        onChange={a.loadImage}
        style={{ display: "none" }}
      />
      <label className="btn-outer" htmlFor="upload-image">
        <div className="btn">Upload Image</div>
      </label>
      {a.msg != "" && <p className="message-text">{a.msg}</p>}
      <div className="nav-btns">
        <button id="nav-btn" name="nav-btn" style={{ display: "none" }} />
        <label className="btn-outer" htmlFor="encode-btn">
          {(a.secret === "" || !a.isImageUploaded) && (
            <div
              className="btn-disabled"
              onClick={() => a.setMsg("Please upload an image!")}
            >
              Encode
            </div>
          )}
          {a.secret != "" && a.isImageUploaded  && (
            <div className="btn" onClick={a.encode}>
              Encode
            </div>
          )}
        </label>
        <button id="nav-btn" name="nav-btn" style={{ display: "none" }} />
        <label className="btn-outer" htmlFor="encode-btn">
          <div
            className="btn"
            onClick={() => {
              a.setMsg("");
              a.setIsImageUploaded(false);
              navigate("/", { replace: true });
            }}
          >
            Return to Home Page
          </div>
        </label>
      </div>
      {/* <button className="btn" onClick={() => navigate("/", { replace: true })}>
        Return to Home Page
      </button> */}
      <img
        style={{ display: "none" }}
        id="encoded-image"
        alt="encoded output"
      ></img>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Encode;
