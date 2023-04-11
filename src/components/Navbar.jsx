import React from "react";
import logo from "../images/Logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  return (
    <div id="navbar" className="navbar">
      <img onClick={() => navigate("/")} className="navbar-logo" src={logo} alt="" />
    </div>
  );
};

export default Navbar;
