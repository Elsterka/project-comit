import User from "../models/user.model.js";// Importing the User model

// Controller function to get users for the sidebar
export const getUsersForSidebar = async (req, res) => {
    try {
        // Extracting the logged-in user's ID from the authenticated user in the request
        const loggedInUserId = req.user._id;

        // Finding all users excluding the logged-in user (_id: { $ne: loggedInUserId })
        // The $ne operator ensures that the logged-in user is not included in the result
        // Also, selecting only the fields we need (excluding the password with select("-password"))
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // Sending back the filtered list of users in the response with a 200 OK status
        res.status(200).json(filteredUsers);
    } catch (error) {
        // Error handling
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};