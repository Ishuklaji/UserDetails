const User = require('../models/userModel');

// Get user details
exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user details' });
    }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user details' });
    }
};
