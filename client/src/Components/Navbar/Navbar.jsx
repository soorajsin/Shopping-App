import React from "react";
import "./Navbar.css";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import SoorajLogo from "./Sooraj-logo.png";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <AppBar >
          <Toolbar>
            <div className="container">
              <div className="tab1">
                <NavLink>
                  <img src={SoorajLogo} alt="logo" />
                </NavLink>
              </div>
              <div className="tab">
                <input type="text" placeholder="Search Product here..." />
                <button>Search</button>
              </div>
              <div className="tab">
                <NavLink className={"tabbutton"}>Login</NavLink>
              </div>
              <div className="tab">
                <NavLink className={"tabbutton"}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </NavLink>
              </div>
              <div className="tabFinished">
                <NavLink>
                  <Avatar></Avatar>
                </NavLink>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
