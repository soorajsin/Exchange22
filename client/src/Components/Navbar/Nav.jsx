import React, { useCallback, useEffect, useState } from "react";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import apiURL from "../config";

const Nav = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const [userData, setUserData] = useState();
  const navAuth = useCallback(async () => {
    const token = await localStorage.getItem("token");
    // console.log(token);

    const data = await fetch(`${api}/validator`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 201) {
      console.log(res);
      setUserData(res);
    } else {
      console.log("user not found");
    }
  }, [api]);

  useEffect(() => {
    navAuth();
  }, [navAuth]);

  const signOut = async () => {
    const token = await localStorage.getItem("token");
    const data = await fetch(`${api}/signOut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const res = await data.json();
    // console.log(res);
    if (res.status === 211) {
      localStorage.removeItem("token");
      history("/");
      window.location.reload();
    } else {
      alert("Not Log Out");
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className="nav">
            <div className="tab">
              <NavLink to={"/home"} className={"tabClick"}>
                <img
                  src="https://shopping-app-xx1p.vercel.app/static/media/Sooraj-logo.4ea9ba32a0c93354b8a8.png"
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="tab">
              <NavLink to={"/home"} className={"tabClick"}>
                Home
              </NavLink>
            </div>
            <div className="tab">
              <NavLink to={"/profile"} className={"tabClick"}>
                Profile
              </NavLink>
            </div>
            <div className="tab">
              <NavLink to={"/"} className={"tabClick"}>
                Login
              </NavLink>
            </div>
            <div className="tab">
              <div className={"tabClick"}>
                <Avatar className="avatarIcon">
                  {userData ? userData.data.email.charAt(0).toUpperCase() : ""}
                </Avatar>
                <div className="avatarManu">
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>
                      {/* Email */}
                      {userData ? userData.data.email : "Email"}
                    </NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink to={"/home"} className={"avatarClick"}>
                      Home
                    </NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink to={"/profile"} className={"avatarClick"}>
                      Profile
                    </NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink to={"/"} className={"avatarClick"}>
                      Login
                    </NavLink>
                  </div>
                  <div className="avatartab" onClick={signOut}>
                    <NavLink className={"avatarClick"}>Log Out</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
