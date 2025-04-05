const Post = require("../models/Posts");

const getpostsController = async (req, res) => {
  try {
    // Fetch all content (posts + reels), already stored in one model
    const allContent = await Post.find()
      .populate("userId", "username profilePic location")
      .sort({ createdAt: -1 });

    res.status(200).json(allContent);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error: Unable to fetch posts and reels" });
  }
};

module.exports = { getpostsController };
