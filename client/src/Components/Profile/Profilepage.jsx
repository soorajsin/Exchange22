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
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  const navAuth = useCallback(async () => {
    const token = await localStorage.getItem("token");

    const data = await fetch(`${api}/validator`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    const res = await data.json();

    if (res.status === 201) {
      setUserData(res);
    } else {
      history("/");
    }
  }, [api, history]);

  // Function to filter players based on the search term
  const filteredPlayers = () => {
    if (!userData) {
      return [];
    }

    return userData.data.addPlayer.filter((addPlayer) =>
      addPlayer.pname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    navAuth();
  }, [navAuth, filteredPlayers]);

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

    if (res.status === 204) {
      window.location.reload();
    } else {
      alert("Failed to Delete Food");
    }
  };

  const updatePlayer = (addPlayerId, index) => {
    history(`/update/${addPlayerId}`);
  };

  return (
    <>
      <div className="management">
        <div className="managementCon">
          <div className="add">
            <button onClick={addNewPlayer}>ADD NEW PLAYER</button>
          </div>
          <div className="show">
            <input
              type="search"
              placeholder="Search name here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="show">
            {filteredPlayers().length > 0 ? (
              filteredPlayers().map((addPlayer, index) => (
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
                          onClick={() => updatePlayer(addPlayer._id, index)}
                          className="fa-solid fa-pen-nib"
                        ></i>
                      </div>
                    </>
                  </div>
                </div>
              ))
            ) : (
              <p>Player not found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
