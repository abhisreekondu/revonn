const express = require("express");
const router = express.Router();
const { toggleLike } = require("../controllers/likedpostscontoller");

// Route to toggle like
router.put("/like/:postId", toggleLike);

module.exports = router;
