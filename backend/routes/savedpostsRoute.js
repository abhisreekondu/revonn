const express = require('express');
const router = express.Router();
const { getSavedPosts } = require('../controllers/getSavedPosts');

router.get('/:userId', getSavedPosts);

module.exports = router;
