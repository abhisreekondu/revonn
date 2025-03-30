import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Community from '../pages/Community';  
import Explore from '../pages/Explore';  
const TabNavigation = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}
    >
      {/* Tabs Component */}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered

      >
        <Tab label="Following" sx={{ color: 'red' }} />
        <Tab label="Explore" sx={{ color: 'red' }} />
        <Tab label="Reels" sx={{ color: 'red' }} />
      </Tabs>

      {/* Content Based on Selected Tab */}
      <Box >
        {value === 0 && <Community />} 
        {value === 1 && <Explore/>}
        {value === 2 && <div>Reels Content</div>}
      </Box>
    </Box>
  );
};

export default TabNavigation;
