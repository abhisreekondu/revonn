import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Header = () => {
  return (
    // <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        {/* Left side: Connect Text */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
  Connect
</Typography>


        {/* Right side: Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="end">
            <AddIcon />
          </IconButton>
          <IconButton  edge="end">
            <NotificationsIcon />
          </IconButton>
          <IconButton edge="end">
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </Toolbar>
    // </AppBar>
  );
};

export default Header;
