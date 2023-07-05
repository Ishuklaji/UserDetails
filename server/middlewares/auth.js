const jwt = require('jsonwebtoken');

// Authentication middleware
exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Authentication failed: Invalid token' });
        }
        req.user = user;
        next();
    });
};
