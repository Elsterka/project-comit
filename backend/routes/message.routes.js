// Import necessary modules
import express from "express";// Express framework to create the router
// Controller functions for getting and sending messages
import { getMessages, sendMessage } from "../controllers/message.controller.js";
// Middleware to protect routes (authentication check)
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();// Initialize a new router

/**
 * Route: GET /:id - fetches messages between the logged-in user and the user with the provided ID
 * Middleware: `protectRoute` ensures the user is authenticated before accessing messages
 * Controller: `getMessages` handles retrieving the messages
 */
router.get("/:id", protectRoute, getMessages);

//go to message.controller.js to const sendMessage 
//protectRoute - check if the user authentificted + middleware => protectRoute.js
// sendMessage); = next(); from protectRoute.js
router.post("/send/:id", protectRoute, sendMessage);//Sends a message to a specific user (by ID)

// Export the router so it can be used in the main application
export default router;