const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/getuserprofile");

router.get("/profile/:userId", getUserProfile);

module.exports = router;
