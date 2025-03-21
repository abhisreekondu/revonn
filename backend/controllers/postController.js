const mongoose = require("mongoose");
const Post = require("../models/Posts");
const User = require("../models/User");

const getFollowingPosts = async (req, res) => {
  try {
    console.log("Received userId from request:", req.params.userId);
    console.log("🛠 Type of received userId:", typeof req.params.userId);

    // Ensure Mongoose correctly converts the string ID to ObjectId
    let userId;
    try {
      userId = new mongoose.Types.ObjectId(req.params.userId);
    } catch (error) {
      console.log("Invalid ObjectId format");
      return res.status(400).json({ message: "Invalid userId format" });
    }

    console.log("🔄 Converted userId to ObjectId:", userId);

    const user = await User.findOne({ _id: userId });

    if (!user) {
      console.log(" User not found in MongoDB");
      return res.status(404).json({ message: "User not found" });
    }

    console.log(" User found:", user);

    // Fetch posts from users that the logged-in user follows
    const posts = await Post.find({ userId: { $in: user.following } })
      .populate("userId", "username profilePic location")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error(" Server Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getFollowingPosts };
