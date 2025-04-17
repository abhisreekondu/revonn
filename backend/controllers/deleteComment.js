const Post = require("../models/Posts");

exports.deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await post.save();
    res.status(200).json({ message: "Comment deleted", comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
