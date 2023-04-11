import React from "react";
import { useNavigate } from "react-router-dom";
import wink from "../images/wink-emoji.avif";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div className="home">
      <div className="about">
        <h3>
          Unlocking secrets with the power of concealment: Discover the world of{" "}
          <em>Steganography</em>.
        </h3>
        <h3>
          Send secret messages to your friends via images. No one will know.{" "}
          <span>
            <img style={{ height: "20px" }} src={wink} alt="" />
          </span>
        </h3>
      </div>
      <div className="btns">
        <button id="encode-btn" name="encode-btn" style={{ display: "none" }} />
        <label className="btn-outer" htmlFor="encode-btn">
          <div className="btn" onClick={() => navigate("/encode")}>
            Encode
          </div>
        </label>
        <button id="decode-btn" name="decode-btn" style={{ display: "none" }} />
        <label className="btn-outer" htmlFor="decode-btn">
          <div className="btn" onClick={() => navigate("/decode")}>
            Decode
          </div>
        </label>
      </div>
    </div>
  );
};

export default Home;
