import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#4CAF50' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Home
        </Typography>
        <Button color="inherit">e-NAM Mandis</Button>

        <Button
          color="inherit"
          onClick={handleMenuClick}
          endIcon={<ArrowDropDownIcon />}
        >
          Stakeholders
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
        </Menu>

        <Button color="inherit">Aspirational Districts</Button>
        <Button color="inherit">Dashboard</Button>
        <Button color="inherit">eLearning Videos</Button>
        <Button color="inherit">e-NAM Logistics</Button>
        <Button color="inherit">Resources</Button>
        <Button color="inherit">Events Gallery</Button>
        <Button color="inherit">Contact Us</Button>
        <Button color="inherit">Kisan Rath</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
