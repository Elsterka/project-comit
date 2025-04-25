// Import the 'create' 
// function from Zustand, a small and fast state-management library
import { create } from "zustand";

// Define a custom Zustand store hook named 'useConversation'
const useConversation = create((set) => ({
	// State: currently selected conversation (initially null)
	selectedConversation: null,
	// Action: function to update the selected conversation
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	// State: list of messages in the conversation (initially empty)
	messages: [],
	// Action: function to update the list of messages
	setMessages: (messages) => set({ messages }),
}));

// Export the custom hook so it can be used in other parts of the app
export default useConversation;
