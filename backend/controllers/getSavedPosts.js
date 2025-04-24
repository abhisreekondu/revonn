const mongoose = require("mongoose");
const User = require("../models/Users");

exports.getSavedPosts = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId).populate("savedPosts").exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Fetched Saved Posts:", user.savedPosts);
    res.status(200).json(user.savedPosts);
  } catch (err) {
    console.error("Error fetching saved posts:", err.message);
    res.status(500).json({ message: "Error fetching saved posts" });
  }
};
