const mongoose = require('mongoose');

const ReelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Link to the user who posted the reel
  username: { type: String, required: true },
  profilePic: { type: String, default: '' },  // User's profile picture
  location: { type: String, required: true },  // Location of the user
  videoUrl: { type: String, required: true },  // URL for the video content
  caption: { type: String, required: true },
  likes: { type: Number, default: 0 },  // Number of likes on the reel
  comments: [{ username: String, text: String }],  // Comments on the reel
}, { timestamps: true });  // Automatically add timestamps (createdAt, updatedAt)

module.exports = mongoose.model('Reel', ReelSchema);
