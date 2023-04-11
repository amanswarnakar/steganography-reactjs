import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StegoContext from "../context/StegoContext";

const Decode = () => {
  let navigate = useNavigate();
  const a = useContext(StegoContext);
  // console.log(a);
  return (
    <div className="decode">
      <h1>Decode</h1>
      <div className="box">
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
        <label className="btn-outer" htmlFor="decode-btn">
          {!a.isImageUploaded && (
            <div
              className="btn-disabled"
              onClick={() => a.setMsg("Please upload an image!")}
            >
              Decode
            </div>
          )}
          {a.isImageUploaded && (
            <div name="decode-btn" className="btn" onClick={a.decode}>
              Decode
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
              navigate("/");
            }}
          >
            Return to Home Page
          </div>
        </label>
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

export default Decode;
