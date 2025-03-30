import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import PostCard from "../components/Postcard";

const Community = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/revonn/followingposts/660f6c1b3a4a5b0012345673")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("AxiosError", err));
  }, []);

  return (
    <Container maxWidth="lg">
      {posts.length === 0 ? (
        <Typography>No posts from followed users.</Typography>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </Container>
  );
};

export default Community;
