// getUsers.js (Route File)
const express = require("express");
const router = express.Router();
const SearchUsersController = require("../controllers/searchUsersController");

// Assuming the function for fetching users is in searchUsersController.js
router.get("/search", SearchUsersController.searchUsers);  

module.exports = router;
