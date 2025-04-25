// Import mongoose to work with MongoDB
import mongoose from "mongoose";

// Define the schema for the conversation model
const conversationSchema = new mongoose.Schema(
    {
        // Define the 'participants' field as an array of ObjectIds
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        // Define the 'messages' field as an array of ObjectIds
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                //start of messages is empty array
                default: [],
            },
        ],
    },
    { timestamps: true }// Add timestamps (createdAt and updatedAt) automatically to each conversation
);

// Create a Mongoose model for the Conversation schema
// "Conversation" is the name of the model, and it's associated with the "conversations" collection in MongoDB
const Conversation = mongoose.model("Conversation", conversationSchema);

// Export the model so it can be used in other parts of the application (like controllers or routes)
export default Conversation;