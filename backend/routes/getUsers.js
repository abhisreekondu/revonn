const express = require('express');


const router = express.Router();
const { getUsersController } = require('../controllers/getUsersController');
router.get('/', getUsersController);

module.exports = router;