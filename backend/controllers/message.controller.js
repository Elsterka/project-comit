// Importing necessary modules and models
import Conversation from "../models/conversation.model.js";// Importing the Conversation model
import Message from "../models/message.model.js";// Importing the Message model
import { getReceiverSocketId, io } from "../socket/socket.js";// Importing socket utilities

// Controller for sending messages
export const sendMessage = async (req, res) => {
    try {
        //we get a message from user
        const { message } = req.body;
        //from message.routes.js - router.post("/send/:id", protectRoute, sendMessage);
        //we get user id
        const { id: receiverId } = req.params;
        //user
        const senderId = req.user._id;//._id - user id in DB
        //find a conversation between users
        let conversation = await Conversation.findOne({

            //we have a conversation between two users [senderId, receiverId]
            participants: { $all: [senderId, receiverId] },//mongoose syntax
        });
        //if convo not exist we create one
        if (!conversation) {
            // conversation.model.js - default: [],
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        //we create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        //put this message into the messages array
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();//for DB
        // await newMessage.save();//for DB wait longer

        // Save both the conversation and the new message in parallel using Promise.all
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY: Send the new message to the receiver if they are connected
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // If the receiver is connected via socket, emit the new message to their socket
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        //send as a response
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller for retrieving messages between the user and another user
export const getMessages = async (req, res) => {
    try {
        // Extract the userToChatId from the URL parameters
        const { id: userToChatId } = req.params;
        // Extract the sender's user ID from the authenticated user
        const senderId = req.user._id;
        // Find the conversation between the sender and receiver by checking if both participants are present
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // // Populate the messages array with actual message data, not just IDs

        // If no conversation is found, return an empty array (no messages yet)
        if (!conversation) return res.status(200).json([]);

        // Extract the messages from the populated conversation
        const messages = conversation.messages;

        // Send the messages as the response
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};