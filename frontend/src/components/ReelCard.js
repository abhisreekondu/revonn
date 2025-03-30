import React from "react";
import { Avatar, Card, CardContent, CardMedia, IconButton, Typography, Box } from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline, Send, MoreVert } from "@mui/icons-material";

const ReelCard = ({ reel }) => {
  return (
    <Card sx={{ width: '100%', marginBottom: 1 }}>
      {/* User Info */}
      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={reel.userId.profilePic}
            alt={reel.userId.username}
            sx={{ width: 40, height: 40, marginRight: 1 }}
          />
          <div>
            <Typography variant="subtitle1" fontWeight="bold">
              {reel.userId.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {reel.userId.location}
            </Typography>
          </div>
        </div>
        <IconButton>
          <MoreVert />
        </IconButton>
      </CardContent>

      {/* Reel Video */}
      <CardMedia
        component="video"
        controls
        sx={{ borderRadius: 2 }}
        src={reel.videoUrl} // Assuming you have a `videoUrl` property in your reels schema
        alt="Reel video"
      />

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
