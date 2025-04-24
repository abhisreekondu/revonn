const User = require("../models/Users");

const editUserProfile = async (req, res) => {
  try {
    const { username, email, profilePic, location, bio } = req.body;
    const userId = req.params.userId; 

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: "Username already in use" });
      }
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.location = location || user.location;
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Edit profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  editUserProfile,
};
