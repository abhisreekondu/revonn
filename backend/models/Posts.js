const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  caption: String,
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ['image', 'video'], required: true },
  contentType: { type: String, enum: ['post', 'reel'], required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
      username: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Posts", PostSchema);
