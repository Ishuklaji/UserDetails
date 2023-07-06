const express = require('express');
const { register, getUserProfile, updateUserDetails, getUsers } = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/update/:id', authMiddleware, updateUserDetails);
router.get('/', getUsers)

module.exports = router;
