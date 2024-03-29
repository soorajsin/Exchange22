import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Nav from "./Components/Navbar/Nav";
import Homepage from "./Components/Home/Homepage";
import Profilepage from "./Components/Profile/Profilepage";
import ADDPlayer from "./Components/Profile/ADD/ADDPlayer";
import UpdatePage from "./Components/Profile/Update/UpdatePage";
import AddCalPage from "./Components/Home/ADDCAL/AddCalPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/add" element={<ADDPlayer />} />
          <Route path="/update/:addPlayerId" element={<UpdatePage />} />
          <Route path="/addCal/:addPlayerId" element={<AddCalPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
