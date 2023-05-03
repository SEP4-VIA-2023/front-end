import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "./App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Changed BrowserRouter to HashRouter to work with github pages

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
