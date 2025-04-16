// src/components/Header.js
import React, { useState } from 'react';
import { Toolbar, Typography, IconButton, Box, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    handleMenuClose();

    if (option === 'Upload Post') {
      navigate('/upload-post');
    } else if (option === 'Upload Reel') {
      navigate('/upload-reel');
    }
  };

  return (
    <>
  <Toolbar
  sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1300,
    backgroundColor: 'white',
    px: 2, 
    minHeight: '64px', 
    boxSizing: 'border-box',
  }}
>
  <Typography
    variant="h6"
    noWrap
    sx={{ fontWeight: 'bold' }}
  >
    CONNECT
  </Typography>

  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
    <IconButton size="large" onClick={handleAddClick}>
      <AddIcon />
    </IconButton>
    <IconButton size="large">
      <NotificationsIcon />
    </IconButton>
    <IconButton size="large">
      <MoreHorizIcon />
    </IconButton>
  </Box>
</Toolbar>



      {/* Menu under Add Icon */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{ 'aria-labelledby': 'add-button' }}
        slotProps={{ paper: { style: { width: '18ch' } } }}
      >
        <MenuItem onClick={() => handleMenuItemClick('Upload Post')}>Upload Post</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Upload Reel')}>Upload Reel</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
