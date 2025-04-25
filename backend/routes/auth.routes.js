import express from 'express';// Express framework to create the router

// Import controller functions for authentication
import { login, logout, signup } from "../controllers/auth.controller.js"

const router = express.Router();// Create a new Express router

//server.js app.use("/api/auth", authRoutes);
router.post("/signup", signup);//Registers a new user

router.post("/login", login);//Authenticates a user and starts a session 

router.post("/logout", logout);//Logs the user out by clearing the session

// Export the router so it can be used in the application
export default router;

