import "./sidebar.scss";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear user session or authentication state here. For example:
    localStorage.removeItem('user');

    // Then navigate to the login page
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">front-end SEP4</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/graph" style={{ textDecoration: "none" }}>
              <AutoGraphIcon className="icon" />
              <span>Graphs</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </Link>
          </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
