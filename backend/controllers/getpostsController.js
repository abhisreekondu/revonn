const Post = require("../models/Posts");
const Reels = require("../models/Reels");

const getPostsAndReelsController = async (req, res) => {
  try {
    
    const posts = await Post.find()
    .populate("userId", "username profilePic location") // Fetch user data for each post
    .sort({ createdAt: -1 });
  
  const reels = await Reels.find()
    .populate("userId", "username profilePic location") // Fetch user data for each reel
    .sort({ createdAt: -1 });
  

    // Combine the posts and reels into one array
    const combinedContent = [...posts, ...reels];

    // Sort combined content by creation date in descending order
    combinedContent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Send the combined array of posts and reels
    res.status(200).json(combinedContent);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getPostsAndReelsController };
