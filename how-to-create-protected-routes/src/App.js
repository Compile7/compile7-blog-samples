import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";
import LandingPage from "./LandingPage";
import Protect from "./Protect";
import Public from "./Public";
import Private from "./Private";
import "./App.css";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const logIn = () => {
    setisLoggedIn(true);
  };
  const logOut = () => {
    setisLoggedIn(false);
  };
  return (
    <Router>
      <Navbar />
      {isLoggedIn ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <button onClick={logIn}>Login</button>
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/public" element={<Public />} />
        <Route
          path="/private"
          element={
            <Protect isLoggedIn={isLoggedIn}>
              <Private />
            </Protect>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
