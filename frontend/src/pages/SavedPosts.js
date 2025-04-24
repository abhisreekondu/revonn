import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/Postcard";
import ReelCard from "../components/ReelCard";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"; // 👈 for navigation

const SavedPostsPage = () => {
  const userId = useSelector((state) => state.user.details._id);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 👈 initialize navigation

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/revonn/savedposts/${userId}`);
        setSavedPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch saved posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchSavedPosts();
  }, [userId]);

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", mt: 4, mb: 2, paddingTop:"25px" }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Saved Posts
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "200px" }}>
          <CircularProgress />
        </Box>
      ) : savedPosts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No saved posts yet.</p>
      ) : (
        savedPosts.map((post, index) => {
          const style = {
            paddingBottom: index === savedPosts.length - 1 ? "50px" : undefined,
          };

          return post.contentType === "reel" ? (
            <div key={post._id} style={style}>
              <ReelCard post={post} />
            </div>
          ) : (
            <div key={post._id} style={style}>
              <PostCard post={post} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default SavedPostsPage;
