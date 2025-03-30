// In your backend (e.g., users.js or getusers.js route file)
const User = require('../models/User'); // Assuming you have the User model

const getUsersController = async (req, res) => {
  try {
    const users = await User.find() // Fetch all users
      .select('username profilePic location') // Only select necessary fields
      .sort({ username: 1 }); // Sort by username alphabetically (optional)
      
    res.status(200).json(users);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getUsersController };
