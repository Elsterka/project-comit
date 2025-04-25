// useEffect is used to handle 
// side effects like listening for incoming messages
import { useEffect } from "react";
// Custom context to access the socket instance
import { useSocketContext } from "../context/SocketContext";
// Zustand store hook to manage the conversation state
import useConversation from "../zustand/useConversation";
// Import a notification sound that plays when a new message is received
import notificationSound from "../assets/sounds/notification.mp3";

// Custom hook to listen for 
// real-time incoming messages via WebSocket (socket.io)
const useListenMessages = () => {
	// Access the socket instance from context
	const { socket } = useSocketContext();
	// Access current messages and 
	// the setter function from global state (zustand)
	const { messages, setMessages } = useConversation();
	// useEffect sets up a listener 
	// for incoming messages when the component mounts
	useEffect(() => {
		// Only set up the listener if the socket connection exists
		socket?.on("newMessage", (newMessage) => {
			// Add a flag to the message 
			// that can be used to trigger animations (like shaking)
			newMessage.shouldShake = true;
			// Play a notification sound on receiving a new message
			const sound = new Audio(notificationSound);
			sound.play();
			// Add the new message to the current list of messages
			setMessages([...messages, newMessage]);
		});
		// Cleanup function to remove the 
		// listener when component unmounts or dependencies change
		return () => socket?.off("newMessage");
		// Re-run effect if socket, messages, or setMessages change
	}, [socket, setMessages, messages]);
};
// Export the custom hook for use in components like MessageContainer or Home
export default useListenMessages;
