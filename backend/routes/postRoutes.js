const express = require('express');


const router = express.Router();
const { getFollowingPosts } = require('../controllers/postController');
router.get('/following/:userId', getFollowingPosts);

module.exports = router;
