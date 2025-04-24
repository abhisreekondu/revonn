import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";
import ProfileContentTabs from "../components/profiletab";
import { useSelector } from "react-redux";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

  const navigate = useNavigate();

  const { userId } = useParams();
  const currentUser = useSelector((state) => state.user.details);
  const currentUserId = currentUser?._id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

const handleMenuClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

 
useEffect(() => {
  if (!userId || !currentUserId) return;

  axios
    .get(`http://localhost:5000/revonn/users/profile/${userId}?currentUserId=${currentUserId}`)
    .then((res) => {
      setUser(res.data);
      setIsFollowing(res.data.isFollowed || false);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching user profile:", err);
      setLoading(false);
    });
}, [userId, currentUserId]);


  const handleFollowToggle = async () => {
    try {
      console.log("currentUserId in profile page:", currentUserId);
      console.log("targetUserId (userId from params) in profile page:", userId);

      const res = await axios.put(`http://localhost:5000/revonn/follow/toggle`, {
        targetUserId: userId,
        currentUserId,
      });
      setIsFollowing(res.data.following);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };
  

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography textAlign="center" mt={4}>
        User not found.
      </Typography>
    );
  }

  return (
    <Container
  maxWidth={false}
  disableGutters
  sx={{
    width: '98%',
    overflowX: 'hidden',
    pt: '50px',
    pb: '40px',
  }}
>

      {/* Profile Header */}
      <Box position="relative" p={2}>
  {/* Top-right menu icon */}
  <Box position="absolute" top={16} right={10}>
    <IconButton onClick={handleMenuClick}>
      <MoreVertIcon />
    </IconButton>
    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
  {currentUserId === userId ? (
    // Own Profile Menu
    <MenuItem
      onClick={() => {
        handleMenuClose();
        navigate("/settings"); // or `/user/settings`, based on your route
      }}
    >
      Settings
    </MenuItem>
  ) : (
    // Other User Profile Menu
    <>
      <MenuItem onClick={handleMenuClose}>Report</MenuItem>
      <MenuItem onClick={handleMenuClose}>Block</MenuItem>
      <MenuItem onClick={handleMenuClose}>Share Profile</MenuItem>
    </>
  )}
</Menu>

  </Box>

  {/* Profile content */}
  <Box display="flex" alignItems="center" mt={1}>
    <Avatar
      src={user.profilePic}
      alt={user.username}
      sx={{ width: 80, height: 80, mr: 2 }}
    />
    <Box>
      <Typography variant="h6">{user.username}</Typography>
      <Typography variant="body2" color="text.secondary">
        {user.bio || ""}
      </Typography>
    </Box>
  </Box>
</Box>

      {/* Stats */}
      <Grid container spacing={2} textAlign="center">
        <Grid item xs={4}>
          <Typography fontWeight="bold">{user.posts}</Typography>
          <Typography variant="body2" color="text.secondary">
            Posts
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight="bold">{user.followers}</Typography>
          <Typography variant="body2" color="text.secondary">
            Followers
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight="bold">{user.following}</Typography>
          <Typography variant="body2" color="text.secondary">
            Following
          </Typography>
        </Grid>
      </Grid>

      {/* Buttons */}
      {currentUserId!=userId &&(
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          fullWidth
          variant={isFollowing ? "outlined" : "contained"}
          color="error"
          sx={{ mr: 1 }}
          onClick={handleFollowToggle}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <Button fullWidth variant="outlined" color="error">
          Message
        </Button>
      </Box>
)}
    
      <ProfileContentTabs userId={userId} currentUserId={currentUserId} />
    </Container>
  );

};

export default UserProfile;
