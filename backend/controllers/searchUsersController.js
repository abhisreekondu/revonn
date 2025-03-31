// searchUsersController.js
const User = require("../models/User");

exports.searchUsers = async (req, res) => {
  const query = req.query.query;  // Get the search query from the URL

  try {
    const users = await User.find({ username: { $regex: query, $options: "i" } });  // Match users by username
    res.json(users);  // Send the filtered users as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};
