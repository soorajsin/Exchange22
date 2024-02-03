import React, { useState } from "react";
import "./mix.css";
import { NavLink, useNavigate } from "react-router-dom";
import apiURL from "../config";

const Login = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const [sendData, setSendData] = useState({
    email: "",
    password: ""
  });

  const changeData = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };
  console.log(sendData);

  const submitToRegister = async (e) => {
    e.preventDefault();

    const { email, password } = sendData;

    if (!email || !password) {
      alert("Please fill all fields");
    } else if (!email.includes("@")) {
      alert("Invalid Email");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters");
    } else {
      // console.log("reg");

      const data = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendData)
      });

      const res = await data.json();
      // console.log(res);

      if (res.status === 202) {
        alert("Email  not found");
      } else if (res.status === 203) {
        alert("Password not matched");
      } else if (res.status === 201) {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        history("/home");
      }
    }
  };
  return (
    <>
      <div className="register">
        <div className="regContainer">
          <div className="form">
            <h1>Welcome to Login</h1>
          </div>
          <div className="form">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={sendData.email}
              onChange={changeData}
              placeholder="Enter email"
            />
          </div>
          <div className="form">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={sendData.password}
              onChange={changeData}
              placeholder="Enter password"
            />
          </div>
          <div className="form">
            <button onClick={submitToRegister}>Login</button>
          </div>
          <div className="form">
            <p>
              Have not a account? <NavLink to={"/register"}>Register</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
