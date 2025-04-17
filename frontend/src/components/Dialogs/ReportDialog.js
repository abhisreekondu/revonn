import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, List, ListItem, ListItemText, Typography,
  Snackbar, Alert
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const reasons = [
  "I just don't like it",
  "Bullying or Unwanted contact",
  "Violence, hate or exploitation",
  "Suicide, self-injury or eating disorders",
  "Selling or promoting restricted items",
  "Nudity or sexual activity",
  "Scam, fraud or spam",
  "False information",
  "Intellectual Property"
];

const ReportDialog = ({ open, onClose, post, fetchPosts }) => {
    const currentUser = useSelector((state) => state.user.details);
    const [submitting, setSubmitting] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
    const handleReasonClick = async (reason) => {
      setSubmitting(true);
      try {
        await axios.post("http://localhost:5000/revonn/report", {
          reportedBy: currentUser._id,
          targetType: "post",
          targetId: post._id,
          reason,
        });
  
        await axios.put("http://localhost:5000/revonn/follow/toggle", {
          currentUserId: currentUser._id,
          targetUserId: post.userId._id,
        });
  
        setSnackbarOpen(true);
        onClose(); // closes the dialog
        fetchPosts(); // triggers refetch
      } catch (err) {
        console.error("Error reporting/unfollowing:", err);
      } finally {
        setSubmitting(false);
      }
    };
  

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle align="center">Report</DialogTitle>
        <Typography align="center">Why are you reporting this post?</Typography>
        <Typography align="center" variant="body2" color="text.secondary">Your report is anonymous</Typography>
        <DialogContent>
          <List>
            {reasons.map((reason, index) => (
              <ListItem
                button
                key={index}
                disabled={submitting}
                onClick={() => handleReasonClick(reason)}
              >
                <ListItemText primary={reason} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Report submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReportDialog;
