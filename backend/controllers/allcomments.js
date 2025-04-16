// controllers/commentController.js
const Post = require("../models/Posts");

exports.getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("comments.userId", "username profilePic");

    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json(post.comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
