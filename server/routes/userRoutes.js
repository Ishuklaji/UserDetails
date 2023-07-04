const express = require('express');
const router = express.Router();
const { getUserDetails, updateUserDetails } = require("../controllers/userController");
const { authenticateToken } = require('../middlewares/auth');

// Get user details
router.get('/user/:userId', authenticateToken, getUserDetails);

// Update user details
router.put('/user/:userId', authenticateToken, updateUserDetails);

module.exports = router;
