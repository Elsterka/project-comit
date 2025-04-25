// Import useState to manage component-level state
import { useState } from "react";
// Import the custom zustand store hook 
// for accessing conversation state and actions
import useConversation from "../zustand/useConversation";
// Import toast to show notifications (like error messages)
import toast from "react-hot-toast";

// Custom hook for sending messages in a chat
const useSendMessage = () => {
	// Local state to track whether a message is 
	// currently being sent (used for loading 
	// spinner or disabling UI)
	const [loading, setLoading] = useState(false);

	// Accessing conversation-related state from zustand:
	// - messages: the list of current chat messages
	// - setMessages: function to update the messages list
	// - selectedConversation: the currently active chat
	const { messages, setMessages, selectedConversation } = useConversation();

	// Function to send a message to the server
	const sendMessage = async (message) => {
		setLoading(true);
		try {
			// Make a POST request to the backend API to send the message
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					// Let the server know we're sending JSON
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			// Parse the response into JSON format
			const data = await res.json();
			// If the response contains an error, throw it to be handled below
			if (data.error) throw new Error(data.error);
			// If the message was sent successfully, 
			// add the new message to the existing messages array
			setMessages([...messages, data]);
		} catch (error) {
			// Show a toast error message if sending fails
			toast.error(error.message);
		} finally {
			// Whether success or error, stop the loading state
			setLoading(false);
		}
	};
	// Return the message sending 
	// function and the loading state to be used in the component
	return { sendMessage, loading };
};
// Export the hook so it can be used in other components
export default useSendMessage;
