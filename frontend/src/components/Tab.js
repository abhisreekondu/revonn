import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Community from '../pages/Community';  

const TabNavigation = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tabs Component */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tab label="Following" sx={{ color: 'red' }} />
        <Tab label="Explore" sx={{ color: 'red' }} />
        <Tab label="Reels" sx={{ color: 'red' }} />
      </Tabs>

      {/* Content Based on Selected Tab */}
      <Box sx={{ padding: 2 }}>
        {value === 0 && <Community />} {/* Render Community when Following tab is selected */}
        {value === 1 && <div>Explore Content</div>}
        {value === 2 && <div>Reels Content</div>}
      </Box>
    </Box>
  );
};

export default TabNavigation;
