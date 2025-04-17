import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

const AboutAccountDialog = ({ open, onClose, user }) => {
  if (!user) return null;
console.log("From account Dialog:",user)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{color:"red"}}>About this account</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={user.profilePic} sx={{ width: 60, height: 60, mr: 2 }} />
          <Box>
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {user.location || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bio: {user.bio || "No bio available"}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Joined: {new Date(user.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default AboutAccountDialog;
