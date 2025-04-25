// Import necessary React functions
import { createContext, useContext, useState } from "react";
// Create a new context for authentication
export const AuthContext = createContext();

// Custom hook to use the AuthContext more conveniently in components
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};
// AuthContextProvider wraps around components that need access to authentication data
export const AuthContextProvider = ({ children }) => {
	// Initialize authUser state from localStorage if available, otherwise null
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
	// Provide authUser and setAuthUser function to all child components
	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
