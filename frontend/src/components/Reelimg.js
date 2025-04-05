import React from 'react';
import { Card, CardMedia } from '@mui/material';

const Reelimg = ({ reel }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Display video for reel */}
      <CardMedia
        component="video"
        controls
        height="140"
        src={reel.mediaUrl} 
      />
    </Card>
  );
};

export default Reelimg;
