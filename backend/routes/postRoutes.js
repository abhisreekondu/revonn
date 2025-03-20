const express = require("express");
const { getFollowingPosts } = require("../controllers/postController");

const router = express.Router();


router.get("/following/:userId", getFollowingPosts); // Fetch posts from followed users


module.exports = router;
