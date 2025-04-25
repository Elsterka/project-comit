// Import necessary modules
import express from "express";// Express framework to create the router
import protectRoute from "../middleware/protectRoute.js";// Middleware to protect the route (authentication check)
import { getUsersForSidebar } from "../controllers/user.controller.js";// Controller function to handle fetching users

// Create a new Express router instance
const router = express.Router();

/**
 * Route: GET - ftches users for displaying in the sidebar 
 * Middleware: `protectRoute` ensures that only authenticated users can access this route
 * Controller: `getUsersForSidebar` contains the logic to retrieve and return the user list
 */
router.get("/", protectRoute, getUsersForSidebar);

// Export the router so it can be mounted in the main app
export default router;