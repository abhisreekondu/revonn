import React, { useState, useEffect } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlagIcon from "@mui/icons-material/Flag";
import InfoIcon from "@mui/icons-material/Info";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useSelector } from "react-redux";
import axios from "axios";
import AboutAccountDialog from "./Dialogs/AboutAccountDialog";
import ReportDialog from "./Dialogs/ReportDialog";

const PostOptionsMenu = ({ post, fetchPosts }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const open = Boolean(anchorEl);
  const currentUserId = useSelector((state) => state.user.details?._id);

  useEffect(() => {
    setIsSaved(post?.savedBy?.includes(currentUserId));
  }, [post, currentUserId]);
  

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleToggleFollow = async () => {
    try {
      await axios.put(`http://localhost:5000/revonn/follow/toggle`, {
        targetUserId: post.userId._id,
        currentUserId,
      });
      handleClose();
      fetchPosts();
    } catch (err) {
      console.error("Error toggling follow:", err);
    }
  };

  const handleToggleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/revonn/posts/save/${post._id}`, {
        userId: currentUserId,
      });

      setIsSaved(res.data.saved);

      handleClose();
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  const handleReportClick = () => {
    setAnchorEl(null);
    setReportDialogOpen(true);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

     

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem onClick={handleToggleSave}>
          <ListItemIcon>
            {isSaved ? (
              <BookmarkIcon fontSize="small" />
            ) : (
              <BookmarkBorderIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>{isSaved ? "Unsave" : "Save"}</ListItemText>
        </MenuItem>


        <MenuItem onClick={handleToggleFollow}>
          <ListItemIcon><PersonRemoveIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Unfollow</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { setAboutOpen(true); handleClose(); }}>
          <ListItemIcon><InfoIcon fontSize="small" /></ListItemIcon>
          <ListItemText>About this account</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleReportClick}>
          <ListItemIcon><FlagIcon fontSize="small" sx={{ color: 'red' }} /></ListItemIcon>
          <ListItemText sx={{ color: 'red' }}>Report</ListItemText>
        </MenuItem>
      </Menu>

      <AboutAccountDialog
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        user={post.userId}
      />

      <ReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        post={post}
        fetchPosts={fetchPosts}
      />
    </>
  );
};

export default PostOptionsMenu;
