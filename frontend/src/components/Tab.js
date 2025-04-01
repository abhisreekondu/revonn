import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Following from '../pages/Following';
import Explore from '../pages/Explore';
import Reels from "../pages/Reels";
import SearchUsers from './SearchUsers';

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
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Following" sx={{ color: 'red' }} />
        <Tab label="Explore" sx={{ color: 'red' }} />
        <Tab label="Reels" sx={{ color: 'red' }} />
      </Tabs>

      {/* Content Based on Selected Tab */}
      <Box>
        {value === 0 && <Following />} 
        
        {value === 1 && (
          <Box>
            <SearchUsers /> 
            <Explore />    
          </Box>
        )}
        
        {value === 2 && <Reels />}  
      </Box>
    </Box>
  );
};

export default TabNavigation;
