const Post = require("../models/Posts");
const Reels = require("../models/Reels");

const getpostsController = async (req, res) => {
  try {
    // Fetching all posts and reels
    const posts = await Post.find()
      .sort({ createdAt: -1 });

    const reels = await Reels.find()
      .sort({ createdAt: -1 });

    // If there are no reels, return only posts
    if (reels.length === 0 && posts.length > 0) {
      return res.status(200).json(posts);
    }

    // If there are no posts, return only reels
    if (posts.length === 0 && reels.length > 0) {
      return res.status(200).json(reels);
    }

    // If there are both posts and reels, combine them and return
    const combinedContent = [...posts, ...reels];

    // Sort combined content by creation date in descending order
    combinedContent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(combinedContent);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error: Unable to fetch posts and reels" });
  }
};

module.exports = { getpostsController };
