import Home from "./pages/home/Home";
import Register from "./pages/register/Register";

import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Changed BrowserRouter to HashRouter to work with github pages

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
