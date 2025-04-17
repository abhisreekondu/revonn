const Post=require("../models/Posts")
exports.toggleSave = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      const isSaved = post.savedBy.includes(userId);
  
      if (isSaved) {
        post.savedBy.pull(userId);
      } else {
        post.savedBy.push(userId);    
      }
  
      await post.save();
      res.status(200).json({
        saved: !isSaved,
        message: isSaved ? "Post unsaved" : "Post saved"
      });
      ;
    } catch (err) {
      console.error("Toggle save error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  