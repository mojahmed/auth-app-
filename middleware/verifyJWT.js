const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;//Bearer token

    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // the split method
    const token = authHeader.split(" ")[1]; // Split on a space to get the token bec token will come after Bearer

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });//forbidden mean i cant access the user 
        req.user = decoded.UserInfo.id; // Store user ID for further use
        next(); // Call the next middleware or route handler
    });
};

module.exports = verifyJWT;
