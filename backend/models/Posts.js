const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String, required: true },
  profilePic: { type: String, default: "" },
  location: { type: String, required: true }, 
  imageUrl: { type: String, required: true },
  caption: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ username: String, text: String }],
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
