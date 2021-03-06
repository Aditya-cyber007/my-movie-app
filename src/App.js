import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import MyList from "./components/MyList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Login />} />
		  <Route path="/register" element={<Register />} />
		  <Route path="/home" element={<Home />} />
      <Route path="/mylist" element={<MyList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;