import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((state) => state.user.details);
 const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilePic: "",
    location: "",
    bio: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        profilePic: user.profilePic || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate Cloudinary later; for now we create a temp URL
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profilePic: url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/revonn/editprofile/${user._id}`,
        formData
      );
      setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to update profile.", severity: "error" });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, paddingBottom: "60px" }}>

<IconButton onClick={() => navigate(-1)} >
          <ArrowBackIcon />
        </IconButton>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Profile
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <Avatar
            src={formData.profilePic}
            sx={{ width: 80, height: 80 }}
          />
          <IconButton
            component="label"
            size="small"
            sx={{
              position: "absolute",
              bottom: 0,
              right: "calc(50% - 40px)", // centers the icon on Avatar
              bgcolor: "white",
              border: "1px solid #ccc",
              zIndex: 1,
              "&:hover": {
      bgcolor: "white", // Prevent background color change on hover
    },
            }}
          >
            <PhotoCamera fontSize="small" />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </IconButton>
        </Box>

        <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
        <TextField label="Profile Picture URL" name="profilePic" value={formData.profilePic} onChange={handleChange} fullWidth />
        <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
        <TextField label="Bio" name="bio" value={formData.bio} onChange={handleChange} multiline rows={3} fullWidth />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Profile
        </Button>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProfile;
