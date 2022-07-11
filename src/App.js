import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
		  <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
