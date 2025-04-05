const express = require("express");
const router = express.Router();
const { getFollowingContent}  = require("../controllers/getFollowingContent");

router.get("/:userId", getFollowingContent);

module.exports = router;
