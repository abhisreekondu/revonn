import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Send,
  MoreVert,
} from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
  const currentUserId = useSelector((state) => state.user.details?._id);

  const [liked, setLiked] = useState(
    Array.isArray(post.likes) && post.likes.includes(currentUserId)
  );
  
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLikeToggle = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/revonn/posts/like/${post._id}`,
        { userId: currentUserId }
      );

      if (res.data.message === "Liked") {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      } else {
        setLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <Card sx={{ width: "100%", marginBottom: 1 }}>
      {/* User Info */}
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={post.userId.profilePic}
            alt={post.userId.username}
            sx={{ width: 40, height: 40, marginRight: 1 }}
          />
          <div>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.userId.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.userId.location}
            </Typography>
          </div>
        </div>
        <IconButton>
          <MoreVert />
        </IconButton>
      </CardContent>

      {/* Post Image */}
      <CardMedia
        component="img"
        image={post.mediaUrl}
        alt="Post"
        sx={{ borderRadius: 2 }}
      />

      {/* Caption + Icons */}
      <CardContent sx={{ paddingBottom: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Caption */}
          <Typography
            variant="body2"
            component="span"
            color="text.secondary"
            sx={{ wordWrap: "break-word" }}
          >
            {post.caption}
          </Typography>

          {/* Icons */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton onClick={handleLikeToggle}>
              {liked ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>

            <Typography variant="body2">{likesCount}</Typography>

            <IconButton>
              <ChatBubbleOutline />
            </IconButton>
            <IconButton>
              <Send />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
