// Importing the 'jsonwebtoken' library to create and manage JWT tokens
import jwt from "jsonwebtoken";

/*
 * This function generates a JWT token for a given user ID and sets it as a cookie in the response.
 * 
 * @param {string} userId - The unique identifier of the user
 * @param {object} res - The HTTP response object used to set the cookie
 */
const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign/*method*/({ userId }/*payload*/, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    // Set the generated token as a cookie in the response
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // Miliseconds format
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });
};

// Export the function so it can be used in other parts of the application
export default generateTokenAndSetCookie;