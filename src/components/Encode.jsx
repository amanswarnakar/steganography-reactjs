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
  // console.log(a.isEncoded);
  // console.log(a);
  return (
    <div className="encode">
      <h1>Encode</h1>
      <div className="box">
        <div className="secret-message">
          <h3>Enter Secret Message to Encode:</h3>
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
            {a.secret != "" && a.isImageUploaded && (
              <div className="btn" onClick={a.encode}>
                Encode
              </div>
            )}
          </label>
          {/* <button id="nav-btn" name="nav-btn" style={{ display: "none" }} />
          <label className="btn-outer" htmlFor="download-btn">
            {(a.secret === "" || !a.isEncoded || !a.isImageUploaded) && (
              <div
                className="btn-disabled"
                onClick={() => a.setMsg("Please upload an image!")}
              >
                Download Image
              </div>
            )}
            {a.secret != "" && a.isEncoded && a.isImageUploaded && (
              <div className="btn" onClick={a.downloadImage}>
                Download Image
              </div>
            )}
          </label> */}
          <button id="nav-btn" name="nav-btn" style={{ display: "none" }} />
          <label className="btn-outer" htmlFor="return">
            <div
              className="btn"
              onClick={() => {
                a.setMsg("");
                a.setIsImageUploaded(false);
                navigate("/");
              }}
            >
              Return to Home Page
            </div>
          </label>
        </div>
      </div>
      <div className="center">
        <img
          style={{ display: "none" }}
          id="encoded-image"
          alt="encoded output"
        ></img>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
};

export default Encode;
