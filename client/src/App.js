import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes from react-router-dom

import UserForm from "./components/userform/UserForm";
import UserDetails from "./components/UserDetail";
import Topbar from "./components/topbar/Topbar";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<UserForm />} /> {/* Use element prop */}
        <Route path="/user-details/:id" element={<UserDetails />} />{" "}
        {/* Use element prop */}
      </Routes>
    </Router>
  );
}

export default App;
