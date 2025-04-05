import React from 'react';
import { Card, CardMedia } from '@mui/material';

const Postimg = ({ post }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Post Image"
        height="140"
        image={post.mediaUrl} 
      />
    </Card>
  );
};

export default Postimg;
