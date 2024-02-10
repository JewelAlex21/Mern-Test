import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetails from "./components/userdetail/UserDetail";
import UserForm from "./components/userform/UserForm";
import Topbar from "./components/topbar/Topbar";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/user-details/:id" element={<UserDetails />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
