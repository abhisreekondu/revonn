import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress, Box, Grid } from "@mui/material";
import PostCard from "../components/Postcard";
import { useSelector } from "react-redux";

const Following = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.details);
  const userId = user?._id;

  console.log("Redux User:", user);
  console.log("Resolved userId from Redux:", userId);

  useEffect(() => {
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

  console.log("Loading:", loading);
  console.log("Posts:", posts);
  console.log("Error:", error);

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
      ) : error ? (
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      ) : posts.length === 0 ? (
        <Typography align="center">No posts from followed users.</Typography>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} sm={12} md={12} key={post._id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Following;
