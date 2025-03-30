import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Grid, Typography,Box ,CircularProgress} from '@mui/material';
import Postimg from "../components/Postimg";  // Assuming PostCard is in the components folder
import Reelimg from "../components/Reelimg";  // Assuming ReelCard is in the components folder

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/revonn/allposts')
      .then((res) => {
        setPosts(res.data);  // Posts and reels combined will be fetched
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="md">
      {/* Display loading state */}
      {loading ? ( 
         <Box
         sx={{
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           minHeight: "100vh",  
         }}
       >
        <CircularProgress />
        </Box>
      )  : (
        <Grid container spacing={1} sx={{ padding: 0, margin: 0 }}>
          {posts.length === 0 ? (
            <Typography variant="h6" align="center">No posts or reels available.</Typography>
          ) : (
            posts.map((item) => (
              <Grid item xs={4} sm={4} md={3} key={item._id}>
                {/* Check if it's a post or a reel */}
                {item.videoUrl ? (
                  <Reelimg reel={item} />  
                ) : (
                  <Postimg post={item} />  
                )}
              </Grid>
            ))
          )}
        </Grid>
      )}
   </Container>
  );
};

export default Explore;
