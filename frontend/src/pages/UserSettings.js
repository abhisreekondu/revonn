import React from 'react';
import { Box, IconButton, Typography, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const UserSettings = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ paddingTop: '50px' }}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h6" sx={{ p:2}}>
        Settings
      </Typography>

      <List>
        <ListItem button onClick={() => navigate('/saved')}>
          <ListItemText primary="Saved Posts" />
        </ListItem>
        <ListItem button onClick={() => navigate('/edit-profile')}>
          <ListItemText primary="Edit Profile" />
        </ListItem>
        <ListItem button onClick={() => navigate('/account-settings')}>
          <ListItemText primary="Account Settings" />
        </ListItem>
        <ListItem button onClick={() => navigate('/notifications')}>
          <ListItemText primary="Notification Settings" />
        </ListItem>
        <ListItem button onClick={() => navigate('/support')}>
          <ListItemText primary="Help & Support" />
        </ListItem>
        <ListItem button onClick={() => navigate('/report')}>
          <ListItemText primary="Report a Problem" />
        </ListItem>
      </List>
    </Box>
  );
};


export default UserSettings;
