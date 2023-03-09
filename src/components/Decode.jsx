import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StegoContext from "../context/StegoContext";
const Decode = () => {
  let navigate = useNavigate();
  const a = useContext(StegoContext);
  console.log(a);
  return (
    <div>
      <h1>Decode</h1>

      <label htmlFor="upload-image">
        <input
          type="file"
          id="upload-image"
          name="upload-image"
          onChange={a.loadImage}
          style={{ display: "none" }}
        />
        <div>Upload Image</div>
      </label>

      <button onClick={a.decode}>Decode</button>
      <p>{a.msg}</p>
      <button
        className="return-to-home"
        onClick={() => navigate("/", { replace: true })}
      >
        Return to Home Page
      </button>

      <img
        style={{ display: "none" }}
        id="encoded-image"
        alt="encoded output"
      ></img>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Decode;
