const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET

const authenticateToken = (roles=null) => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        if (!roles || roles.includes(decoded.role)) {
            next();
        } else {
            res.status(403).json({ error: 'You are not authorized to perform this action.' });
        }
    } catch (err) {
        res.status(403).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
