// Import necessary hooks and libraries
import { useState } from "react";// useState hook for managing loading state

import toast from "react-hot-toast";// for displaying toast notifications (error messages)

import { useAuthContext } from "../context/AuthContext";// custom hook to access authentication context

// Custom hook to handle user signup logic
const useSignup = () => {
	// State to track if the signup request is in progress
	//  (useful for showing loading spinner or disabling buttons)
	const [loading, setLoading] = useState(false);
	// Access the setAuthUser function 
	// from the AuthContext to update the logged-in user globally
	const { setAuthUser } = useAuthContext();

	// Main signup function that will be called when user submits the signup form
	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		// First, validate the input fields using the helper function	
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });

		// If validation fails, stop the signup process 
		// (don't proceed with API call)
		if (!success) return;

		// Set loading state to true to indicate that the signup 
		// request is in progress
		setLoading(true);
		try {
			// Send POST request to the server with the signup data
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			// Parse the response from the server into JSON
			const data = await res.json();
			// If the server returns an error, throw an error 
			// to be caught in the catch block
			if (data.error) {
				throw new Error(data.error);
			}
			// If signup is successful, store the user 
			// data in localStorage for persistence
			localStorage.setItem("chat-user", JSON.stringify(data));
			// Update the global authentication context with
			//  the new user data (this will set the logged-in user)
			setAuthUser(data);
		} catch (error) {
			// If any error occurs (server error, network error),
			//  show an error message in a toast
			toast.error(error.message);
		} finally {
			// Set loading state back to false 
			// when the process is complete (either success or failure)
			setLoading(false);
		}
	};
	// Return the loading state and the signup function 
	// so they can be used in the component that calls this hook
	return { loading, signup };
};
// Export the useSignup hook to use it in components
export default useSignup;

// Helper function to validate input fields before submitting the signup form
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	// Check if any of the fields are empty
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		// Show a toast error message if any field is empty
		toast.error("Please fill in all fields");
		return false;
	}
	// Check if the passwords match
	if (password !== confirmPassword) {
		// Show a toast error message if the passwords do not match
		toast.error("Passwords do not match");
		return false;
	}
	// Check if the password is at least 6 characters long
	if (password.length < 6) {
		// Show a toast error message if the password is too short
		toast.error("Password must be at least 6 characters");
		return false;
	}
	// If all validations pass, return true
	return true;
}
