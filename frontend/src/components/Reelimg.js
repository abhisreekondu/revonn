import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Reelimg = ({ reel }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Display video for reel */}
      <CardMedia
        component="video"
        controls
        height="140"
        src={reel.videoUrl} // Video URL
      />
    </Card>
  );
};

export default Reelimg;
