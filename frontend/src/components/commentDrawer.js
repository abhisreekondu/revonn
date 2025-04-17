// components/CommentDrawer.jsx
import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  CircularProgress,IconButton
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";

const CommentDrawer = ({ open, onClose, post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const currentUser = useSelector((state) => state.user.details);
  const [isLoading, setIsLoading] = useState(false);
  const [posting,setPosting]=useState(false);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:5000/revonn/allcomments/${post._id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (post && open) {
      fetchComments();
    }
  }, [post, open]);

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/revonn/deletecomment/${post._id}/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };
  

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setPosting(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/revonn/addcomment/${post._id}`,
        {
          userId: currentUser._id,
          username: currentUser.username,
          text: newComment,
        }
      );
      setComments([...comments, res.data]);
      setNewComment("");
      await fetchComments();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
    finally {
      setPosting(false); 
    }
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Box p={2} sx={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        {isLoading ? (
  <Box display="flex" justifyContent="center" alignItems="center" py={4}>
    <CircularProgress />
  </Box>
) : (
  comments.map((comment, index) => (
    <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
  <Box display="flex" alignItems="center">
    <Avatar src={comment.userId?.profilePic} sx={{ width: 30, height: 30, mr: 1 }} />
    <Box>
      <Typography variant="subtitle2">{comment.username}</Typography>
      <Typography variant="body2">{comment.text}</Typography>
    </Box>
  </Box>
  {comment.userId?._id === currentUser._id && (
    <IconButton onClick={() => handleDeleteComment(comment._id)} size="small">
      <DeleteIcon fontSize="small" />
    </IconButton>
  )}
</Box>

    
  ))
)}

      </Box>
      <Box p={2} display="flex" gap={1} borderTop="1px solid #ddd">
        <TextField
          fullWidth
          size="small"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
         <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          disabled={posting || !newComment.trim()}
        >
          {posting ? <CircularProgress size={22} color="inherit" /> : "Post"}
        </Button>
      </Box>
    </Drawer>
  );
};

export default CommentDrawer;
