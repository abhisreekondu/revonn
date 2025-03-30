const mongoose = require("mongoose");
const Reels = require("../models/Reels"); 
const User = require("../models/User");

const getfollowingreels = async (req, res) => {
  try {
    console.log("Received userId from request:", req.params.userId);
    console.log("🛠 Type of received userId:", typeof req.params.userId);

    // Convert userId to ObjectId
    const userId = new mongoose.Types.ObjectId(req.params.userId); 

    console.log("Converted userId to ObjectId:", userId);

    // Find user by userId
    const user = await User.findOne({ _id: userId });

    if (!user) {
      console.log("User not found in MongoDB");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    // Fetch reels from users that the logged-in user follows
    const reels = await Reels.find({ userId: { $in: user.following } }) // Using Reels model
      .populate("userId", "username videoUrl location") // Populate user details
      .sort({ createdAt: -1 }); // Sort by the most recent

    // Respond with the reels
    res.status(200).json(reels);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getfollowingreels }; 