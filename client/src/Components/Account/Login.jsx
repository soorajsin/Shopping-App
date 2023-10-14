import React, { useState } from "react";
import "./mix.css";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const history = useNavigate();

  const url = "http://localhost:4000";

  const [inp, setInp] = useState({
    email: "",
    password: "",
  });

  const changeData = (e) => {
    const { name, value } = e.target;

    setInp({
      ...inp,
      [name]: value,
    });
  };
  console.log(inp);

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = inp;

    if (email === "") {
      alert("Please Enter your email");
    } else if (!email.includes("@")) {
      alert("Please Enter valid email Eg:- abc@gmail.com");
    } else if (password === "") {
      alert("Please Enter password");
    } else if (password.length < 6) {
      alert("Please Enter your password character atleast 6 ");
    } else {
      console.log("login");

      const data = await fetch(`${url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();

      if (res.status === 202) {
        alert("Email not found");
      } else if (res.status === 203) {
        alert("Password is not matched");
      } else if (res.status === 210) {
        // alert("You are successfully logged in");
        // console.log(res);
        localStorage.setItem("userDataToken", res.result.token);
        setInp({ ...inp, email: "", password: "" });
        history("/");
      }
    }
  };

  return (
    <div className="account">
      <div className="container">
        <div className="register">
          <h1 style={{ wordSpacing: "55px" }}>Welcome to Login</h1>
          <br />
          <div className="form">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter your email..."
              name="email"
              value={inp.email}
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
              value={inp.password}
              onChange={changeData}
            />
          </div>
          <br />
          <div className="form">
            <button onClick={loginUser}>Login</button>
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
