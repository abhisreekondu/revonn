const express = require('express');
const router = express.Router();
const { getfollowingreels } = require('../controllers/getfollowingreelsController'); // Fixed typo here

router.get('/:userId', getfollowingreels); 

module.exports = router;
