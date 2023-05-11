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
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">front-end SEP4</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <Link to="/graphs" style={{ textDecoration: "none" }}>
            <li>
              <AutoGraphIcon className="icon" />
              <span>Graphs</span>
            </li>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}> {/* Add this line */}
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link> {/* And this line */}
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
