import React, { useState } from "react";
import "./mix.css";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const url = "http://localhost:4000";

  const history = useNavigate();

  const [sendData, setSendData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const changeData = async (e) => {
    const { name, value } = e.target;

    setSendData({
      ...sendData,
      [name]: value,
    });
  };
  console.log(sendData);

  const registerData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = sendData;

    if (name === "") {
      alert("Please Enter your name");
    } else if (email === "") {
      alert("Please Enter your email...");
    } else if (!email.includes("@")) {
      alert("Please Enter valid email Eg. abc@gmail.com");
    } else if (password === "") {
      alert("please enter password");
    } else if (password.length < 6) {
      alert("Please Password Enter atleast 6 Character");
    } else if (cpassword === "") {
      alert("Please Enter confirm password");
    } else if (cpassword.length < 6) {
      alert("Please Confirm Password must be atleast 6 character");
    } else if (password !== cpassword) {
      alert("Please, Password and confirm password not matched");
    } else {
      console.log("register");

      const data = await fetch(`${url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, cpassword }),
      });

      const res = await data.json();

      if (res.status === 202) {
        alert("Email Already Exist ");
      }
      if (res.status === 210) {
        // console.log("done");
        // console.log(res);
        setSendData({
          ...sendData,
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
        history("/login");
      }
    }
  };

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
              name="name"
              value={sendData.name}
              onChange={changeData}
              placeholder="Enter your name..."
            />
          </div>
          <br />
          <div className="form">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter your email..."
              name="email"
              value={sendData.email}
              onChange={changeData}
            />
          </div>
          <br />
          <div className="form">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter your password..."
              name="password"
              value={sendData.password}
              onChange={changeData}
            />
          </div>
          <br />
          <div className="form">
            <label htmlFor="cpassword">Confirm Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter your confirm password..."
              name="cpassword"
              value={sendData.cpassword}
              onChange={changeData}
            />
          </div>
          <br />
          <div className="form">
            <button onClick={registerData}>Register</button>
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
