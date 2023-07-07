const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Invalid Token. Please login",
            status: 2
        });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token. Please login",
            status: 2
        });
    }
}

module.exports = {
    authenticator
};
