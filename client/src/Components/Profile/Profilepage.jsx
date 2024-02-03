import React, { useCallback, useEffect, useState } from "react";
import "./Profilepage.css";
import { useNavigate } from "react-router-dom";
import apiURL from "../config";

const Profilepage = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const addNewPlayer = () => {
    history("/add");
  };

  const [userData, setUserData] = useState();
  //   console.log("profile", userData);
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
      history("/");
    }
  }, [api, history]);

  useEffect(() => {
    navAuth();
  }, [navAuth]);

  const deletePlayer = async (addPlayerId, index) => {
    const token = await localStorage.getItem("token");
    const data = await fetch(`${api}/deletePlayer`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ addPlayerId })
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 204) {
      console.log(res);
      window.location.reload();
    } else {
      alert("Failed to Delete Food");
    }
  };

  return (
    <>
      <div className="management">
        <div className="managementCon">
          <div className="add">
            <button onClick={addNewPlayer}>ADD NEW PLAYER</button>
          </div>
          <div className="show">
            {userData
              ? userData.data.addPlayer.map((addPlayer, index) => (
                  <div key={index} className="showData">
                    <img src={addPlayer.pimg} alt="img" />
                    <h3>{addPlayer.pname}</h3>
                    <div className="manage">
                      <>
                        <div className="handle">
                          <i
                            onClick={() => deletePlayer(addPlayer._id, index)}
                            className="fa-solid fa-trash"
                          ></i>
                        </div>
                        <div className="handle">
                          <i
                            // onClick={() => updateFood(addFood._id, index)}
                            className="fa-solid fa-pen-nib"
                          ></i>
                        </div>
                      </>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
