import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Build, DirectionsCar, Search, Navigation } from '@mui/icons-material';
import { red } from '@mui/material/colors';

const BottomNavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      sx={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      <BottomNavigationAction
        icon={<Home sx={{ color: red[500] }} />} // Red color for Home icon
      />
      <BottomNavigationAction
        icon={<Build sx={{ color: red[500] }} />} // Red color for Build icon
      />
      <BottomNavigationAction
        icon={<DirectionsCar sx={{ color: red[500] }} />} // Red color for DirectionsCar icon
      />
      <BottomNavigationAction
        icon={<Search sx={{ color: red[500] }} />} // Red color for Search icon
      />
      <BottomNavigationAction
        icon={<Navigation sx={{ color: red[500] }} />} // Red color for Navigation icon
      />
    </BottomNavigation>
  );
};

export default BottomNavBar;
