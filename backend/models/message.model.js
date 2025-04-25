import mongoose from "mongoose";

// Define the schema for messages
const messageSchema = new mongoose.Schema(
    {
        // ID of the user who sent the message
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // ID of the user who received the message
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // The actual message content
        message: {
            type: String,
            required: true,
        },
        // mongoose will automatically will create this data - 
        // createdAt, updatedAt => message.createdAt : 15:30 
    },
    { timestamps: true }
);

// Create a Mongoose model from the schema
// This connects the schema to the "messages" collection in MongoDB
const Message = mongoose.model("Message", messageSchema);


// Export the model so it can be used in controllers and routes
export default Message;