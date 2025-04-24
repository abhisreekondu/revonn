const mongoose = require("mongoose");
const Post = require("../models/Posts");
const User = require("../models/Users");

exports.toggleSave = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid postId or userId" });
  }

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ message: "Post or User not found" });
    }

    const isSaved = post.savedBy.includes(userId);

    if (isSaved) {
      post.savedBy.pull(userId);
      user.savedPosts.pull(postId);
    } else {
      post.savedBy.push(userId);
      user.savedPosts.push(postId);
    }

    await post.save();
    await user.save();

    res.status(200).json({
      saved: !isSaved,
      message: isSaved ? "Post unsaved" : "Post saved"
    });

  } catch (err) {
    console.error("Toggle save error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
