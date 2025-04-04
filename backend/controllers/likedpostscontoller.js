const Post = require("../models/Posts");
const mongoose = require("mongoose");

exports.toggleLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;  // Expect userId in request body

  if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid postId or userId" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      // Remove like
      post.likes.pull(userId);
    } else {
      // Add like
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({
      message: hasLiked ? "Unliked" : "Liked",
      likesCount: post.likes.length,
      likes: post.likes
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error" });
  }
};
