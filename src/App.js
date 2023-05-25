import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile-presets/Profile";
import Graph from "./pages/graph/Graph";
import SignUpP  from "./pages/signup/Signup";
import "./App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/SignUpP" element={<SignUpP />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
