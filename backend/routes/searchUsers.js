// getUsers.js (Route File)
const express = require("express");
const router = express.Router();
const {searchUsers} = require("../controllers/searchUsersController");

// Assuming the function for fetching users is in searchUsersController.js
router.get("/search",searchUsers);  

module.exports = router;
