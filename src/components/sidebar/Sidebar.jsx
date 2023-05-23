import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";

const Sidebar = () => {
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
            <Link to= "/home" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to= "/graph" style={{ textDecoration: "none" }}>
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
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
