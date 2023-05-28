import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Graph from "./pages/graph/Graph";
import SignUpP from "./pages/signup/Signup";
import "./App.css";

import { Outlet, useNavigate } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Here we will check if user is logged in or not
const checkAuth = () => {
  const token = localStorage.getItem("token");
  return token != null;
};

// This is our new Authenticated component
const Authenticated = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!checkAuth()) {
      navigate("/");
    }
  }, [navigate]); // here we are using navigate from react-router-dom hooks

  return checkAuth() ? <Outlet /> : null;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home/" element={<Authenticated />}>
            <Route path="" element={<Home />} />
          </Route>
          <Route path="/graph/" element={<Authenticated />}>
            <Route path="" element={<Graph />} />
          </Route>
          <Route path="/SignUpP" element={<SignUpP />} />
          <Route path="/profile/" element={<Authenticated />}>
            <Route path="" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
