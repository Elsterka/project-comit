// Import required modules
import jwt from "jsonwebtoken";// JWT library to handle JSON Web Tokens
import User from "../models/user.model.js";// Import the User model to interact with the database

// Middleware function to protect routes that require authentication
// call in user.routes.js and message.routes.js
const protectRoute = async (req, res, next) => {
    try {
        //token from cookies => go to server.js => 
        // import cookieParser from "cookie-parser";
        //app.use(cookieParser());
        const token = req.cookies.jwt; // The 'jwt' cookie was set on the client-side during login/signup

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }
        //to verify / decode the token with JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);// This will check if the token is valid and return the decoded data

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        //remove password - select("-password")
        const user = await User.findById(decoded.userId).select("-password");// Don't return the password

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // required user = user in DB 
        req.user = user;

        //next(); is an argument from const protectRoute = async (req, res, next) 
        next();//sendMessage); in message.routes.js
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
//will be called in user.routes.js and message.routes.js
export default protectRoute;