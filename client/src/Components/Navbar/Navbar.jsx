import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import SoorajLogo from "./Sooraj-logo.png";
import { ContextNavigate } from "../Context/ContextProvider";
import config from "../../config";

const Navbar = () => {
  const url = config.backendURL;
  const history = useNavigate();
  const { userdata } = useContext(ContextNavigate);

  const signOut = async () => {
    const token = await localStorage.getItem("userDataToken");
    const data = await fetch(`${url}/signOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();

    if (res.status === 210) {
      localStorage.removeItem("userDataToken");
      history("/login");
      window.location.reload();
    } else {
      console.log("not remove token");
    }
  };

  useEffect(() => {
    if (userdata) {
      console.log("user find");
    } else if (!navigator.onLine) {
      window.location.reload();
    }
  }, [userdata]);

  // Conditional rendering based on user authorization
  const renderAuthorizedNavbar = () => {
    return (
      <div className="container">
        <div className="tab1">
          <NavLink to={"/"}>
            <img src={SoorajLogo} alt="logo" />
          </NavLink>
        </div>
        <div className="tab">
          <input type="text" placeholder="Search Product here..." />
          <button>Search</button>
        </div>
        <div className="tab">
          <NavLink to={"/login"} className={"tabbutton"}>
            Login
          </NavLink>
        </div>
        <div className="tab">
          <NavLink to={"/product"} className={"tabbutton"}>
            <i className="fa-solid fa-cart-shopping"></i>
          </NavLink>
        </div>
        <div className="tabFinished">
          <NavLink className={"avatar"}>
            <Avatar className="avatar-main">
              {userdata ? userdata.getData.email.charAt(0).toUpperCase() : ""}
            </Avatar>
            <div id="avatar-manu">
              <div className="manuEmail">{userdata.getData.email}</div>
              <div className="manu">
                <NavLink to={"/"} className="manuItem">
                  Home
                </NavLink>
                <NavLink to={"/product"} className="manuItem">
                  Product
                </NavLink>
                <NavLink to={"/login"} className="manuItem">
                  Login
                </NavLink>
                <NavLink onClick={signOut} className="manuItem">
                  Sign Out
                </NavLink>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    );
  };

  // Conditional rendering for non-authorized users (e.g., showing the Login tab only)
  const renderNonAuthorizedNavbar = () => {
    return (
      <div className="container">
        <div className="tab">
          <NavLink to={"/login"} className={"tabbutton"}>
            Login
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div className="navbar">
      <AppBar>
        <Toolbar>
          {userdata ? renderAuthorizedNavbar() : renderNonAuthorizedNavbar()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
