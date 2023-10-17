import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import SoorajLogo from "./Sooraj-logo.png";
import { ContextNavigate } from "../Context/ContextProvider";

const Navbar = () => {
  const url = "http://localhost:4000";

  const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const navbarData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch(`${url}/validUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();

    if (res.status === 210) {
      // console.log(res);
      setUserData(res);
    } else {
      console.log("user not found");
    }
  };

  useEffect(() => {
    navbarData();
  });

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
    // console.log(res);

    if (res.status === 210) {
      localStorage.removeItem("userDataToken");
      history("/login");
      window.location.reload();
    } else {
      console.log("not remove token");
    }
  };

  return (
    <>
      <div className="navbar">
        <AppBar>
          <Toolbar>
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
                    {userdata
                      ? userdata.getData.email.charAt(0).toUpperCase()
                      : ""}
                  </Avatar>
                  <div id="avatar-manu">
                    {userdata ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <div className="manu">
                          <NavLink to={"/login"} className="manuItem">
                            Login
                          </NavLink>
                        </div>
                      </>
                    )}
                  </div>
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
