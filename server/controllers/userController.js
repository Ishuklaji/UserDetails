const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createUser = async (req, res) => {
    const { name, role, email, password, phoneNumber } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
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

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ message: 'User created', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user' });
    }
};

module.exports = {
    createUser,
};
