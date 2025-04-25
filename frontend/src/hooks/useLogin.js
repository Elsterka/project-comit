// Import useState hook to manage local loading state
import { useState } from "react";
// Import toast for displaying user-friendly error messages
import toast from "react-hot-toast";
// Import authentication context to manage user login state globally
import { useAuthContext } from "../context/AuthContext";

// Custom hook for handling login functionality
const useLogin = () => {
	// Local state to track if the login process is currently in progress
	const [loading, setLoading] = useState(false);
	// Get the function to set the authenticated user from context
	const { setAuthUser } = useAuthContext();

	// Function to log in the user using username and password
	const login = async (username, password) => {
		// Validate input fields using helper function before sending request
		const success = handleInputErrors(username, password);
		if (!success) return;
		// Begin loading state (useful for disabling buttons or showing spinners)
		setLoading(true);
		try {
			// Send POST request to login endpoint with username and password
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			// Parse JSON response from the server
			const data = await res.json();
			// If there's an error from the server, throw it to handle below
			if (data.error) {
				throw new Error(data.error);
			}

			// Save the user data in localStorage for persistence across refreshes
			localStorage.setItem("chat-user", JSON.stringify(data));
			// Update the auth context with the logged-in user data
			setAuthUser(data);
		} catch (error) {
			// If login fails, display an error message via toast
			toast.error(error.message);
		} finally {
			// End the loading state whether login succeeded or failed
			setLoading(false);
		}
	};
	// Return the login function and loading state so they can be used in components
	return { loading, login };
};
// Export the useLogin hook for use in the login component
export default useLogin;

// Helper function to validate input fields before sending login request
function handleInputErrors(username, password) {
	if (!username || !password) {
		// Show error if fields are empty
		toast.error("Please fill in all fields");
		return false;
	}
	// Return true if validation passes
	return true;
}
