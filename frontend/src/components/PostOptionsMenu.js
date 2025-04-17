import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import axios from "axios";

const PostOptionsMenu = ({ post ,fetchPosts }) => {
console.log("Post from the postOptionsMenu:",post)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
   const currentUserId = useSelector((state) => state.user.details?._id);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleToggleFollow = async () => {
    try {
        const res = await axios.put(`http://localhost:5000/revonn/follow/toggle`, {
            targetUserId: post.userId._id,
            currentUserId,
          });

      console.log("Follow status changed:", res.data);
      handleClose(); // close menu after action
      fetchPosts();
    } catch (err) {
      console.error("Error toggling follow:", err);
    }
  };


  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem onClick={handleToggleFollow}>
          <ListItemIcon>
            <PersonRemoveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Unfollow</ListItemText>
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>About this account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FlagIcon fontSize="small" sx={{ color: 'red' }}/>
          </ListItemIcon>
          <ListItemText sx={{ color: 'red' }}>Report</ListItemText>
        </MenuItem>

       
      </Menu>
    </>
  );
};

export default PostOptionsMenu;
