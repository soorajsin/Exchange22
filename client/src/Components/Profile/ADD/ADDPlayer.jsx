import React, { useState } from "react";
import "./ADDPlayer.css";
import { NavLink, useNavigate } from "react-router-dom";
import apiURL from "../../config";

const ADDPlayer = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const [sendData, setSendData] = useState([
    {
      pname: "",
      pimg: ""
    }
  ]);

  const addForm = () => {
    const newForm = {
      pname: "",
      pimg: ""
    };
    setSendData([...sendData, newForm]);
  };
  console.log(sendData);

  const submitToAdd = async () => {
    const emptyField = sendData.some((form) => !form.pname || !form.pimg);

    if (emptyField) {
      alert("Please fill out all fields");
    } else {
      try {
        const token = await localStorage.getItem("token");
        const data = await fetch(`${api}/addPlayer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify({ sendData })
        });

        const res = await data.json();
        // console.log(res);

        if (res.status === 201) {
          console.log(res);
          history("/profile");
        } else {
          alert("Error");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    }
  };
  return (
    <>
      <div className="register">
        <div className="regContainer">
          <div className="form">
            <h2>Welcome to Add Player</h2>
          </div>
          {sendData.map((subForm, index) => (
            <div key={index}>
              <div className="form">
                <label htmlFor="pname">Player Name</label>
                <br />
                <input
                  type="text"
                  value={subForm.pname}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].pname = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter player name"
                />
              </div>
              <div className="form">
                <label htmlFor="pimg">Player Image URL</label>
                <br />
                <input
                  type="url"
                  value={subForm.pimg}
                  onChange={(e) => {
                    const updatedUser = [...sendData];
                    updatedUser[index].pimg = e.target.value;
                    setSendData(updatedUser);
                  }}
                  placeholder="Enter player url"
                />
              </div>
              <div className="form">
                <div className="line"></div>
              </div>
            </div>
          ))}
          <div className="form">
            <button onClick={addForm}>ADD</button>
          </div>
          <div className="form">
            <button onClick={submitToAdd}>Submit</button>
          </div>
          <div className="form">
            <p>
              {" "}
              <NavLink to={"/profile"}>Cancel</NavLink>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ADDPlayer;
