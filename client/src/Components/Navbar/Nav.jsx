import React from "react";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <div className="nav">
            <div className="tab">
              <NavLink className={"tabClick"}>
                <img
                  src="https://shopping-app-xx1p.vercel.app/static/media/Sooraj-logo.4ea9ba32a0c93354b8a8.png"
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="tab">
              <NavLink className={"tabClick"}>Home</NavLink>
            </div>
            <div className="tab">
              <NavLink className={"tabClick"}>Profile</NavLink>
            </div>
            <div className="tab">
              <NavLink to={"/"} className={"tabClick"}>
                Login
              </NavLink>
            </div>
            <div className="tab">
              <div className={"tabClick"}>
                <Avatar className="avatarIcon">
                  {/* {userData ? userData.data.email.charAt(0).toUpperCase() : ""} */}
                </Avatar>
                <div className="avatarManu">
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>
                      Email
                      {/* {userData ? userData.data.email : "Email"} */}
                    </NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>Home</NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink className={"avatarClick"}>Profile</NavLink>
                  </div>
                  <div className="avatartab">
                    <NavLink to={"/"} className={"avatarClick"}>
                      Login
                    </NavLink>
                  </div>
                  <div className="avatartab">
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
