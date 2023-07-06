const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { name, role, email, password, phoneNumber } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            role,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Failed to register user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch user details from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Failed to get user:', error);
        res.status(500).json({ message: 'Failed to get user' });
    }
};

// Controller function for updating user details
const updateUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, email, password, phoneNumber } = req.body;
        
        // Check if the user making the request is a super admin
        if (req.body.role !== 'Super Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user details
        user.name = name;
        user.role = role;
        user.email = email;
        user.password = password;
        user.phoneNumber = phoneNumber;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error('Failed to update user details:', error);
        res.status(500).json({ message: 'Failed to update user details' });
    }
};

module.exports = { register, getUserProfile, updateUserDetails, getUsers };
