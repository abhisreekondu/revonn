const Post = require("../models/Posts");

const getpostsController = async (req, res) => {
  try {
    const { userId, type } = req.query; 

    const filter = {};

    if (userId) {
      filter.userId = userId; 
    }

    if (type) {
      filter.contentType = type; 
    }

    const allContent = await Post.find(filter)
      .populate("userId", "username profilePic location")
      .sort({ createdAt: -1 });

    res.status(200).json(allContent);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error: Unable to fetch posts and reels" });
  }
};

module.exports = { getpostsController };
