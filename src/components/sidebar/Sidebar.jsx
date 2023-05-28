// Importing required libraries and components
import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Dashboard as DashboardIcon, Menu as MenuIcon, AutoGraph as AutoGraphIcon, AccountCircleOutlined as AccountCircleOutlinedIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';

// Define the width of the drawer
const drawerWidth = 240;

function Sidebar(props) {
  // Props destructuring for cleaner code
  const { window } = props;
  
  // Use navigate from react-router for navigation
  const navigate = useNavigate();

  // State for mobile view drawer
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Function to handle the drawer state for mobile view
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate("/"); // Navigate to home page
  };

  // Sidebar drawer with list of options
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {/* Mapping through the list of options */}
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, path: "/home" },
          { text: 'Graphs', icon: <AutoGraphIcon />, path: "/graph" },
          { text: 'Profile', icon: <AccountCircleOutlinedIcon />, path: "/profile" },
          { text: 'Logout', icon: <ExitToAppIcon />, action: logout }
        ].map((item, index) => (
          <ListItem button key={item.text} onClick={item.path ? () => navigate(item.path) : item.action}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  // Return the main Sidebar component
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, ...(mobileOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sep4 Group 1
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="Sidebar navigation"
      >     
        {/* Temporary Drawer for mobile view */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Permanent Drawer for desktop view */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Main content area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box>
    </Box>      
  );
}

// Prop types validation
Sidebar.propTypes = {
  window: PropTypes.func,
};

// Export Sidebar component
export default Sidebar;
