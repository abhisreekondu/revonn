const mongoose = require("mongoose");
const Post = require("../models/Posts");
const Users = require("../models/Users");

const getFollowingContent = async (req, res) => {
  try {
    console.log("Request received in following:", req.params.userId, req.query.type);

    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const user = await Users.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const filter = { userId: { $in: user.following } };
    if (req.query.type) filter.contentType = req.query.type;

    const content = await Post.find(filter)
      .populate("userId", "username profilePic location createdAt")
      .sort({ createdAt: -1 });

    console.log(" Content fetched:", content.length);
    res.status(200).json(content);
  } catch (err) {
    console.error("Server Error in getFollowingContent:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getFollowingContent };
