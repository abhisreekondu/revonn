import React from "react";
import { Avatar, Card, CardContent, CardMedia, IconButton, Typography, Box } from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline, Send, MoreVert } from "@mui/icons-material";

const ReelCard = ({ reel }) => {
  return (
    <Card sx={{ width: '100%', marginBottom: 1 }}>
      {/* User Info */}
      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={reel.userId.profilePic}
            alt={reel.userId.username}
            sx={{ width: 40, height: 40, marginRight: 1 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {reel.userId.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {reel.userId.location}
            </Typography>
          </Box>
        </Box>
        <IconButton>
          <MoreVert />
        </IconButton>
      </CardContent>

      {/* Reel Video */}
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '177.77%', borderRadius: 2, overflow: 'hidden' }}>
        <CardMedia
          component="video"
          controls
          src={reel.videoUrl}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%', // <-- Corrected height
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Caption and Icons */}
      <CardContent sx={{ paddingBottom: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Caption */}
          <Typography variant="body2" component="span" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
            {reel.caption}
          </Typography>

          {/* Icons */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton>
              <FavoriteBorder />
            </IconButton>
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

export default ReelCard;
