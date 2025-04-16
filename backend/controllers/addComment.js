const Post = require("../models/Posts");

exports.addComment = async (req, res) => {

  const { postId } = req.params;
  console.log("Post_id received while adding comment:",postId)
  const { userId, username, text } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });
console.log("Post_id received while adding comment:",postId)
    post.comments.push({
      userId,
      username,
      text,
      createdAt: new Date()
    });

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};
