import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Postimg = ({ post }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Only display image and caption */}
      <CardMedia
        component="img"
        alt="Post Image"
        height="140"
        image={post.imageUrl} // Post image URL
      />
    </Card>
  );
};

export default Postimg;
