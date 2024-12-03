const jwt = require("jsonwebtoken");

// Middleware to check and validate the token
const checkToken = (req, res, next) => {
    try {
        let { token } = req.headers; // Extract token from headers
        if (!token) {
            return res.status(403).send("Access denied: No token provided");
        }
        if (verifyToken(token)) {
            next(); // Proceed to the next middleware or route handler
        } else {
            throw new Error("Invalid token");
        }
    } catch (error) {
        res.status(403).send(`Access denied: ${error.message}`);
    }
};

// Function to create a new JWT token
const createToken = (user) => {
    const { _id, name, email, role } = user; // Extract user data
    const data = { _id, name, email, role };
    return jwt.sign({ data }, "TMVPXTBPB", { expiresIn: "7d" }); // Token valid for 7 days
};

// Function to verify and decode a token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, "TMVPXTBPB"); // Verify token using secret key
        const { data } = decoded;
        return data; // Return the payload data if token is valid
    } catch (error) {
        console.error("Error decoding token:", error);
        return null; // Return null if token is invalid or expired
    }
};

module.exports = { checkToken, createToken, verifyToken };
