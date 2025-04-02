const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET user by specific ID (hardcoded for now)
router.get('/single-user', async (req, res) => {
  const hardcodedUserId = '660f6c1b3a4a5b0012345673';

  try {
    const user = await User.findById(hardcodedUserId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
