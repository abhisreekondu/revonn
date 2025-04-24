const express = require("express");
const router = express.Router();
const { editUserProfile } = require("../controllers/editProfile");

// Edit user profile
router.put("/:userId", editUserProfile);

module.exports = router;
