import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile-presets/Profile";
import Graph from "./pages/graph/Graph";
import SignUpP from "./pages/signup/Signup";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// This is our new Authenticated component
const Authenticated = ({ token }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return token ? <Outlet /> : null;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home/" element={<Authenticated token={token} />}>
            <Route path="" element={<Home />} />
          </Route>
          <Route path="/graph/" element={<Authenticated token={token} />}>
            <Route path="" element={<Graph />} />
          </Route>
          <Route path="/SignUpP" element={<SignUpP />} />
          <Route path="/profile/" element={<Authenticated token={token} />}>
            <Route path="" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
