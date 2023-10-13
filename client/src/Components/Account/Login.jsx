import React from "react";
import "./mix.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="account">
      <div className="container">
        <div className="register">
          <h1 style={{ wordSpacing: "55px" }}>Welcome to Login</h1>
          <br />
          <div className="form">
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" placeholder="Enter your email..." />
          </div>
          <br />
          <div className="form">
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" placeholder="Enter your password..." />
          </div>
          <br />
          <div className="form">
            <button>Login</button>
          </div>
          <br />
          <div className="form">
            <p>
              Have A Already Account?{" "}
              <NavLink to={"/register"} className={"toggle"}>
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
