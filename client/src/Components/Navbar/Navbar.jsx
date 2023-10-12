import React from "react";
import "./Navbar.css";
import { AppBar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className="navbar">
            <div className="container">
              <div className="tab1">
                <NavLink>Logo</NavLink>
              </div>
              <div className="tab">
                <input type="text" placeholder="Search Product here..." />
              </div>
              <div className="tab">
                <NavLink>Login</NavLink>
              </div>
              <div className="tab">
                <NavLink>Product</NavLink>
              </div>
              <div className="tabFinished">
                <NavLink>Avatar</NavLink>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
