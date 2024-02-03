import React from "react";
import { NavLink } from "react-router-dom";

const AddCalPage = () => {
  return (
    <>
      <div className="register">
        <div className="regContainer">
          <div className="form">
            <h2>Welcome to add value</h2>
          </div>
          <div className="form">
            <label htmlFor="vValue">Number</label>
            <br />
            <input type="number" placeholder="Enter value in int" />
          </div>
          <div className="form">
            <button>ADD</button>
          </div>
          <dov className="form">
            <button>Submit</button>
          </dov>
          <br />
          <br />
          <div className="form">
            <p>
              <NavLink to={"/home"}>Cancel</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCalPage;
