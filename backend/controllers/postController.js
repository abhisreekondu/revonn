const Post=require("../models/Post");
const User=require("../models/User");

exports.getFollowingPosts = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Get posts from users in the 'following' list
      const posts = await Post.find({ userId: { $in: user.following } })
        .populate("userId", "username profilePic location") // Include user details
        .sort({ createdAt: -1 });//sort by newest first
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch following posts" });
    }
  };