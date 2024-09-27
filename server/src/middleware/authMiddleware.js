const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../models/tokenBlacklistModel.js'); // Ensure correct path
const { blacklistToken } = require('../models/userModel');

// Middleware to verify token and extract user info
const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assumes 'Bearer token' format

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Check if the token is blacklisted
        const blacklisted = await isTokenBlacklisted(token);
        if (blacklisted) {
            return res.status(403).json({ message: 'Token has expired' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Check for token expiration
            const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
            if (decoded.exp < currentTime) {
                // If expired, blacklist the token
                await blacklistToken(token, new Date()); // You may choose an appropriate expiration date
                return res.status(403).json({ message: 'Token has expired' });
            }

            req.user = decoded; // Attach decoded user data to request object
            next(); // Proceed to next middleware or route handler
        });
    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { authenticate };
