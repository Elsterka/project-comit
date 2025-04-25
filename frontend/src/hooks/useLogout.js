
import { useState } from "react";
// Import custom authentication context to update global auth state
import { useAuthContext } from "../context/AuthContext";
// Import toast to display notifications (like errors)
import toast from "react-hot-toast";

// Custom hook to handle user logout
const useLogout = () => {
	// Local loading state to show feedback while logout is in progress
	const [loading, setLoading] = useState(false);
	// Accessing setAuthUser from global auth context to update user status after logout
	const { setAuthUser } = useAuthContext();

	// Logout function that will be triggered when the user clicks logout
	const logout = async () => {
		// Begin loading state
		setLoading(true);
		try {
			// Make POST request to the backend logout API
			const res = await fetch("/api/auth/logout", {
				method: "POST", // Logout request is sent as a POST 
				// Declare we're sending/receiving JSON
				headers: { "Content-Type": "application/json" },
			});
			// Parse the JSON response
			const data = await res.json();
			// If there's an error returned by the server, throw it
			if (data.error) {
				throw new Error(data.error);
			}
			// Clear the user data from localStorage to log them out locally
			localStorage.removeItem("chat-user");
			// Update the global auth context to reflect the user is logged out
			setAuthUser(null);
		} catch (error) {
			// Show an error message using toast if something goes wrong
			toast.error(error.message);
		} finally {
			// Stop the loading state regardless of success or failure
			setLoading(false);
		}
	};

	// Return both the logout function and loading state for use in components
	return { loading, logout };
};
// Export the hook to use it in logout-related components
export default useLogout;
