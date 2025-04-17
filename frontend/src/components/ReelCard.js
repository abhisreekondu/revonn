import React, { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Send,
  MoreVert,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import CommentDrawer from "./commentDrawer";
import PostOptionsMenu from "./PostOptionsMenu"

const ReelCard = ({ post, fetchPosts}) => {
  const currentUserId = useSelector((state) => state.user.details?._id);
  const [commentOpen, setCommentOpen] = useState(false);
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
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <Card sx={{ width: "100%", marginBottom: 1 }}>
      <CardContent
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={post.userId.profilePic}
            alt={post.userId.username}
            sx={{ width: 40, height: 40, marginRight: 1 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.userId.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.userId.location}
            </Typography>
          </Box>
        </Box>
        <PostOptionsMenu post={post} fetchPosts={fetchPosts} />

      </CardContent>

      <Box
        sx={{ position: "relative", width: "100%", paddingTop: "177.77%", borderRadius: 2, overflow: "hidden" }}
      >
        <CardMedia
          component="video"
          controls
          src={post.mediaUrl}
          sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <CardContent sx={{ paddingBottom: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="body2"
            component="span"
            color="text.secondary"
            sx={{ wordWrap: "break-word" }}
          >
            {post.caption}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton onClick={handleLikeToggle}>
              {liked ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="body2">{likesCount}</Typography>
            <IconButton onClick={() => setCommentOpen(true)}>
        <ChatBubbleOutline />
      </IconButton>

      <CommentDrawer
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
        post={post}
      />

            <IconButton>
              <Send />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
    </Box>
  );
};

export default ReelCard;
