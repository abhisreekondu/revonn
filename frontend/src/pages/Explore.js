import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import Postimg from "../components/Postimg";
import Reelimg from "../components/Reelimg";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/revonn/posts')
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all content:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth={false} sx={{ pt: '10px',paddingBottom: '50px' }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Grid container spacing={1} sx={{ padding: 0, margin: 0 }}>
          {posts.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ width: "100%" }}>
              No reels from followed users are available.
            </Typography>
          ) : (
            posts.map((item) => (
              <Grid item xs={4} sm={6} md={2} key={item._id}>
                {item.contentType === "reel" ? (
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
