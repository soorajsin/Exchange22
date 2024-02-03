import React, { useState } from "react";
import "./mix.css";
import { NavLink, useNavigate } from "react-router-dom";
import apiURL from "../config";

const Register = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const [sendData, setSendData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const changeData = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };
  console.log(sendData);

  const submitToReg = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = sendData;

    if (!name || !email || !password || !cpassword) {
      alert("Please fill all fields");
    } else if (!email.includes("@")) {
      alert("Invalid Email");
    } else if (password.length < 6 && cpassword.length < 6) {
      alert("Password must be at least 6 characters");
    } else if (password !== cpassword) {
      alert("Passwords do not match");
    } else {
      // console.log("reg");

      const data = await fetch(`${api}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendData)
      });

      const res = await data.json();
      //   console.log(res);

      if (res.status === 202) {
        alert("Email  already exists!");
        history("/");
      } else if (res.status === 201) {
        console.log(res);
        history("/");
      }
    }
  };
  return (
    <>
      <div className="register">
        <div className="regContainer">
          <div className="form">
            <h1>Welcome to Register</h1>
          </div>
          <div className="form">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={sendData.name}
              onChange={changeData}
              placeholder="Enter name"
            />
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
            <label htmlFor="cpassword">Confirm Password</label>
            <br />
            <input
              type="password"
              name="cpassword"
              value={sendData.cpassword}
              onChange={changeData}
              placeholder="Enter confirm password"
            />
          </div>
          <div className="form">
            <button onClick={submitToReg}>Register</button>
          </div>
          <div className="form">
            <p>
              Have a account? <NavLink to={"/"}>Login</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
