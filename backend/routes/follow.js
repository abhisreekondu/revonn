const express = require("express");
const router = express.Router();
const { toggleFollow } = require("../controllers/followcontroller");

router.put("/toggle", toggleFollow); // POST /revonn/follow/toggle

module.exports = router;
