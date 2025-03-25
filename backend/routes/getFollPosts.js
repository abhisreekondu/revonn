const express = require('express');


const router = express.Router();
const { getFollowingPosts } = require('../controllers/getfollowingpostsController');
router.get('/:userId', getFollowingPosts);

module.exports = router;
