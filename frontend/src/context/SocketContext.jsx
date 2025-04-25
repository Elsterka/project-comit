// Import necessary React hooks and dependencies
import { createContext, useState, useEffect, useContext } from "react";
// Import the custom authentication context
import { useAuthContext } from "./AuthContext";
// Import socket.io client library
import io from "socket.io-client";
// Create a new context for the socket connection
const SocketContext = createContext();

// Custom hook to access the socket context
export const useSocketContext = () => {
	return useContext(SocketContext);
};

// Context provider component that wraps parts 
// of the app needing socket access
export const SocketContextProvider = ({ children }) => {
	// State to store the socket instance
	const [socket, setSocket] = useState(null);
	// State to track the list of currently online users
	const [onlineUsers, setOnlineUsers] = useState([]);
	// Get the authenticated user from the auth context
	const { authUser } = useAuthContext();

	useEffect(() => {
		// Establish socket connection only if the user is authenticated
		if (authUser) {
			// Connect to the server and pass the userId as a query parameter
			const socket = io("https://chat-app-yt.onrender.com", {
				query: {
					userId: authUser._id,
				},
			});
			// Save the socket instance in state
			setSocket(socket);

			// socket.on() is used to listen to the events. 
			// can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Cleanup: close the socket connection when the component unmounts
			// or when the user logs out
			return () => socket.close();
		} else {
			// If there's no authenticated user, 
			// make sure to close any existing socket
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
		// Run this effect whenever `authUser` changes
	}, [authUser]);
	// Provide the socket and online users state to all children components
	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
