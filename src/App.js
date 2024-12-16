import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Add from "./Pages/User/Add";
import Login from "./Pages/User/Login/Login";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/add-user" element={<Add />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
