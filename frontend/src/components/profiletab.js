import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Grid, Typography, CircularProgress } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import axios from 'axios';
import Reelimg from './Reelimg';
import Postimg from './Postimg'
const ProfileContentTabs = ({ userId }) => {
  const [value, setValue] = useState(0); // 0: posts, 1: reels
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("userId in ProfileTab page:", userId);

  

  const fetchContent = async (type) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/revonn/posts?userId=${userId}&type=${type}`);
      setContent(res.data);
    } catch (err) {
      console.error(`Error fetching ${type}s:`, err);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const contentType = value === 0 ? 'post' : 'reel';
    if (userId) {
      fetchContent(contentType);
    }
  }, [value, userId]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab icon={<ImageIcon />} aria-label="Images" />
        <Tab icon={<VideoLibraryIcon />} aria-label="Videos" />
      </Tabs>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : content.length === 0 ? (
        <Typography align="center" sx={{ mt: 3 }}>
          No {value === 0 ? 'posts' : 'reels'} uploaded.
        </Typography>
      ) : (
        <Grid container spacing={1} sx={{ mt: 2 }}>
  {content.map((item) => (
    <Grid item xs={4} key={item._id}>
      {value === 0 && item.contentType === "post" && <Postimg post={item} />}
      {value === 1 && item.contentType === "reel" && <Reelimg reel={item} />}
    </Grid>
  ))}
</Grid>

      )}
    </Box>
  );
};

export default ProfileContentTabs;
