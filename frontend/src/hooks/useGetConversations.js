// useEffect runs side effects like fetching data on component mount
// useState is used for managing local component state
import { useEffect, useState } from "react";
// toast is used for showing user-friendly error messages
import toast from "react-hot-toast";

// Custom hook to fetch a list of conversations (e.g., all users to chat with)
const useGetConversations = () => {
	// State to indicate if data is currently being loaded
	const [loading, setLoading] = useState(false);
	// State to hold the list of conversations (users)
	const [conversations, setConversations] = useState([]);

	// useEffect runs once when the component using this hook is mounted
	useEffect(() => {
		// Async function to get conversations from the backend
		const getConversations = async () => {
			setLoading(true); // Start loading indicator
			try {
				// Fetch the list of users (or conversations) from the API
				const res = await fetch("/api/users");
				const data = await res.json();
				// If there's an error in the response, throw it to be caught below
				if (data.error) {
					throw new Error(data.error);
				}
				// Update the conversations state with the fetched data
				setConversations(data);
			} catch (error) {
				// Show an error toast if something goes wrong
				toast.error(error.message);
			} finally {
				// Stop the loading indicator once the request is done
				setLoading(false);
			}
		};
		// Call the function to fetch conversations when the hook is first used
		getConversations();
	}, []);// Empty dependency array ensures this runs only once on mount

	// Return the loading state and conversations array for use in UI components
	return { loading, conversations };
};
// Export the custom hook so it can be used in components like Sidebar
export default useGetConversations;
