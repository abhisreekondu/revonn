// searchUsersController.js
const User = require("../models/Users");

exports.searchUsers = async (req, res) => {
  const query = req.query.query || '';  // Get the search query from the URL
  const limit= parseInt(req.query.limit || 10);
  try {
    const users = await User.find({ username: { $regex: query, $options: "i" } })
                            .limit(limit);  // Match users by username
    res.json(users);  // Send the filtered users as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};
