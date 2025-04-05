const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  caption: String,
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ['image', 'video'], required: true },
  contentType: { type: String, enum: ['post', 'reel'], required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  comments: [{ username: String, text: String }],
}, { timestamps: true });

module.exports = mongoose.model("Posts", PostSchema);
