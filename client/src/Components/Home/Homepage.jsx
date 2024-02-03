import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiURL from "../config";
import "./Home.css";

const Homepage = () => {
  const api = apiURL.url;
  const history = useNavigate();

  const [userData, setUserData] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [newPlayerInput, setNewPlayerInput] = useState(""); // State to store the new player input
  const [showInputField, setShowInputField] = useState(false); // State to control whether to show the input field or not
  console.log(newPlayerInput);

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
  }, [navAuth]);

  const plusCal = (playerId) => {
    // Handle the logic to show input text field and save button
    setNewPlayerInput(""); // Clear previous input
    // Implement logic to show input field and save button
    // You can use a state variable to control whether to show the input field or not
    // For example, you can have a state variable like showInputField

    // Example:
    setShowInputField(true);
  };

  const saveNewPlayer = () => {
    // Handle the logic to save the new player input
    // You can add the new player input to your data structure
    // For example, update userData or make an API call to add the new player
    // Example:
    // const updatedPlayers = [...userData.data.addPlayer, { pname: newPlayerInput, pimg: "your_image_url" }];
    // setUserData({ ...userData, data: { ...userData.data, addPlayer: updatedPlayers } });
    // After saving, you might want to hide the input field
    // Example:
    setShowInputField(false);
  };

  return (
    <>
      <div className="management">
        <div className="managementCon">
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
                          onClick={() => plusCal(addPlayer._id, index)}
                          className="fa-solid fa-plus"
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
          {/* Input field and Save button */}
          {showInputField && (
            <div>
              <input
                type="text"
                value={newPlayerInput}
                onChange={(e) => setNewPlayerInput(e.target.value)}
                placeholder="Enter new player name"
              />
              <button onClick={saveNewPlayer}>Save</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;
