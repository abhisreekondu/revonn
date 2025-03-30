import React from 'react';
import { Toolbar, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Header = () => {
  return (
      <Toolbar     sx={{
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'white'
        }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
  Connect
</Typography>
        <Box sx={{display: 'flex', alignItems: 'center' }}>
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
  );
};

export default Header;
