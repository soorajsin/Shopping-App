import React, { useState } from "react";
import "./mix.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const { sendData, setSendData } = useState({
    name: "",
    email: "",
    passsword: "",
    cpassword: "",
  });

  const changeData = async (e) => {
    const { name, value } = e.target;

    setSendData({
      ...sendData,
      [name]: value,
    });
  };
  console.log(setSendData);

  return (
    <div className="account">
      <div className="container">
        <div className="register">
          <h1>Welcome to Register</h1>
          <br />
          <div className="form">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter your name..."
              onChange={changeData}
            />
          </div>
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
            <label htmlFor="cpassword">Confirm Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter your confirm password..."
            />
          </div>
          <br />
          <div className="form">
            <button>Register</button>
          </div>
          <br />
          <div className="form">
            <p>
              Have A Already Account?{" "}
              <NavLink to={"/"} className={"toggle"}>
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
