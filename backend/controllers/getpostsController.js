const Post = require("../models/Posts");


const getpostsController = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username profilePic location")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getpostsController };  
