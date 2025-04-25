// Import necessary modules
import { Server } from "socket.io"; // Socket.IO for real-time bidirectional 
import http from "http";// Node.js HTTP server
import express from "express";// Express framework

// Create an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);
// Initialize a new instance of Socket.IO with CORS configuration
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],// Only allow requests from this origin
        methods: ["GET", "POST"],// Allowed HTTP methods
    },
});

// Function to get a receiver's socket ID using their userId
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// A map to keep track of connected users and their socket IDs
const userSocketMap = {}; // format {userId: socketId}

// Listen for new client connections to Socket.IO
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    // Extract userId from the query string during handshake
    const userId = socket.handshake.query.userId;
    // If userId is valid, map it to the connected socket ID
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. 
    // can be used both on client and server side
    socket.on("disconnect", () => {
        // Listen for disconnect event from this client
        console.log("user disconnected", socket.id);
        // Remove the user from the map upon disconnection
        delete userSocketMap[userId];
        // Update all clients with the new list of online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Export the app, io instance, and server for use elsewhere in the app
export { app, io, server };