// Import React hooks: useEffect to 
// perform side effects, useState to manage loading state
import { useEffect, useState } from "react";
// Import the global chat state from
//  Zustand for managing conversation and messages
import useConversation from "../zustand/useConversation";
// Import toast to show error notifications to the user
import toast from "react-hot-toast";

// Custom hook to fetch messages for the selected conversation
const useGetMessages = () => {
	// Local loading state 
	// to show a spinner or loading indicator while messages are being fetched
	const [loading, setLoading] = useState(false);
	// Access chat state from Zustand store
	const { messages, setMessages, selectedConversation } = useConversation();

	// useEffect runs when the selected conversation changes
	useEffect(() => {
		// Async function to fetch messages from the server
		const getMessages = async () => {
			setLoading(true);// Start loading before the fetch call
			try {
				// Make a GET request to the API to fetch messages for the selected conversation
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				// If the API responds with an error, throw it to be caught below
				if (data.error) throw new Error(data.error);
				// Set the fetched messages in the Zustand store
				setMessages(data);
			} catch (error) {
				// Display error using toast notification
				toast.error(error.message);
			} finally {
				// Whether successful or not, stop loading
				setLoading(false);
			}
		};
		// Only call getMessages if a conversation is selected (i.e., has an _id)
		if (selectedConversation?._id) getMessages();
		// Re-run effect when selected conversation changes
	}, [selectedConversation?._id, setMessages]);
	// Return current messages and loading state for use in components
	return { messages, loading };
};
// Export the custom hook for use in chat-related components
export default useGetMessages;
