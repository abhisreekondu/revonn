const User = require("../models/Users");
const Post = require("../models/Posts");

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUserId = req.query.currentUserId;
    const user = await User.findById(userId).select("username profilePic location bio following");
    if (!user) return res.status(404).json({ message: "User not found" });

    const postsCount = await Post.countDocuments({ userId: user._id });
    const followersCount = await User.countDocuments({ following: user._id });
    const isFollowed = currentUserId ? await User.exists({ _id: currentUserId, following: user._id }) : false;
    res.status(200).json({
      username: user.username,
      profilePic: user.profilePic,
      location: user.location,
      bio: user.bio, 
      posts: postsCount,
      followers: followersCount,
      following: user.following.length,
      isFollowed
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile };
