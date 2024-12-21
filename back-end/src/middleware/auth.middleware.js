import jwt from "jsonwebtoken";
import User from "../model/user.model.js";  // Adjust the import to match your file structure

export const protectRoute = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.jwt;

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        // Find the user by userId from the decoded token
        const user = await User.findById(decoded.userId).select("-password");  // Exclude password field

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user to the request object for later use
        req.user = user;

        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        // Log the error for debugging
        console.error(`Error in protectRoute: ${error.message}`);

        // Send a 500 response if there is a server error
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
