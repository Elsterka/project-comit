// Load core and third-party modules
import path from "path";// Helps with working with file and directory paths
import express from "express";// Web framework for building REST APIs
import dotenv from "dotenv";// Loads environment variables from a .env file 
import cookieParser from "cookie-parser";// Middleware to parse cookies in HTTP requests

// Load route handlers (modularized API endpoints)
import authRoutes from "./routes/auth.routes.js";// Routes for authentication (login, register, etc.)
import messageRoutes from "./routes/message.routes.js";// Routes for messaging features
import userRoutes from "./routes/user.routes.js";// Routes for user-related operations 

// Load MongoDB connection logic
import connectToMongoDB from "./db/connectToMongoDB.js";// Function to connect to MongoDB database
// Load pre-configured Express app and HTTP server with Socket.io integration
import { app, server } from "./socket/socket.js";// Sets up Express and WebSocket (real-time communication)

// Load environment variables from .env file into process.env
dotenv.config();

// Resolve the absolute path of the current directory
const __dirname = path.resolve();

// Set the server port from environment variable or default to 5000
// dotenv.config() must be called before accessing process.env
const PORT = process.env.PORT || 5000;

//middleware - from auth.controller.js - recall const {fullName, username, password, cofirmPassword, gender } = req.body;

app.use(express.json()); // Middleware to parse the incoming requests with JSON payloads (from req.body)
// Middleware to parse cookies from incoming requests
app.use(cookieParser());

//middleware - instead of app.post go to auth.routes.js => router.post("/signup", signup);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);//go to message.routes.js => router.post("/send/:id", protectRoute, sendMessage);
app.use("/api/users", userRoutes); // Routes for user-related operations

// Serve static frontend files from the dist folder (built frontend app)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Fallback route: for any other route, serve the frontend's index.html (for React Router, etc.)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

//port in .env file - Start the HTTP & WebSocket server
server.listen(PORT, () => {
    connectToMongoDB();
    // Log the server status
    console.log(`Server Running on port ${PORT}`);
});



/*app.get("/", (req, res) => {
    // root route http://localhost:5000
    res.send("Hello world!");
});
*/



