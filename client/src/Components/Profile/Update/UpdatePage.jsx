import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./UpdatePage.css";
import apiURL from "../../config";

const UpdatePage = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const { addPlayerId } = useParams();
  //   console.log(addFoodId);
  const [sendData, setSendData] = useState({
    pname: "",
    pimg: ""
  });

  const changeData = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };
  console.log(sendData);

  const fetchedData = async () => {
    try {
      const data = await fetch(`${api}/fetchedDataForManagement`, {
        method: "GET"
      });

      const res = await data.json();
      if (res.status === 201) {
        // console.log("update", res);

        const findupdatefood = await res.data[0].addPlayer.find(
          (addPlayer) => addPlayer._id.toString() === addPlayerId
        );
        // console.log("check", findupdatefood);
        if (findupdatefood) {
          setSendData({
            pname: findupdatefood.pname,
            pimg: findupdatefood.pimg
          });
        } else {
          console.error("Error fetching data:", res.error);
        }
      } else {
        console.error("Food not found for the given ID");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchedData();
  }, []);

  const updateFoodDetails = async () => {
    const { pname, pimg } = sendData;
    if (!pname || !pimg) {
      alert("Please fill all fields");
    } else {
      console.log("done");
      const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/updateFood`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ sendData, addPlayerId })
      });

      const res = await data.json();
      // console.log(res);
      if (res.status === 205) {
        console.log(res);
        history("/profile");
      } else {
        alert("Network check");
      }
    }
  };

  return (
    <>
      <div className="register">
        <div className="regContainer">
          <div className="form">
            <h3>Welcome to Update Player</h3>
          </div>
          <div className="form">
            <label htmlFor="pname">Player Name</label>
            <br />
            <input
              type="text"
              name="pname"
              value={sendData.pname}
              onChange={changeData}
              placeholder="Enter food name"
            />
          </div>
          <div className="form">
            <label htmlFor="pimg">Player Image URL</label>
            <br />
            <input
              type="url"
              name="pimg"
              value={sendData.pimg}
              onChange={changeData}
              placeholder="Enter food url"
            />
          </div>
          <div className="form">
            <button onClick={updateFoodDetails}>Update</button>
          </div>
          <div className="form">
            <h4>
              <NavLink to={"/management"}>Cancel</NavLink>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePage;
