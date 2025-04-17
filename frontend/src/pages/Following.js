import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress, Box, Grid } from "@mui/material";
import PostCard from "../components/Postcard";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const Following = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.details);
  const userId = user?._id;

  console.log("Redux User:", user);
  console.log("Resolved userId from Redux:", userId);

  



  const fetchPosts = useCallback(async ()=>{
    if (!userId) {
      console.log("User ID not available yet. Skipping API call.");
      return;
    }

    console.log(`Making API call to fetch posts for userId: ${userId}`);

    axios
    .get(`http://localhost:5000/revonn/followingcontent/${userId}?type=post`)

      .then((res) => {
        console.log("API Response:", res.data);
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Axios error while fetching posts:", err);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      });
  }, [userId]);
  

  useEffect(() => {
    fetchPosts();
},[fetchPosts])
  

  console.log("Loading:", loading);
  console.log("Posts:", posts);
  console.log("Error:", error);

  return (
    <Container maxWidth={false} 
    disableGutters
    sx={{ 
      width: '98%',
      pt: '93px', 
      paddingBottom: '45px'
      }}>

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
      ) : error ? (
        <Typography variant="h6" color="error" align="center" sx={{paddingTop:'50px'}}>{error}</Typography>
      ) : posts.length === 0 ? (
        <Typography align="center" sx={{paddingTop:'50px'}}>No posts from followed users.</Typography>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} sm={8} md={4} key={post._id}>
              <PostCard post={post} fetchPosts={fetchPosts} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Following;
