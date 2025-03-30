import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress, Box, Grid } from "@mui/material";  // Import CircularProgress
import PostCard from "../components/Postcard";

const Following = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    axios
      .get("http://localhost:5000/revonn/followingposts/660f6c1b3a4a5b0012345673")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("AxiosError", err);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);  // Set loading to false in case of error as well
      });
  }, []);

  return (
    <Container maxWidth="lg">
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
      ) : error ? (  // Show error message if there's an error
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      ) : posts.length === 0 ? (  // If no posts, show a message
        <Typography align="center">No posts from followed users.</Typography>
      ) : (
        <Grid container spacing={2}> 
          {posts.map((post) => (
            <Grid item xs={12} sm={12} md={12} key={post._id}>  {/* Adjusted md={4} for better layout */}
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Following;
