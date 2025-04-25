// Import React's useState hook to manage input state
import { useState } from "react";
// Import the search icon from the react-icons library
import { IoSearchSharp } from "react-icons/io5";
// Import custom Zustand store hook to manage selected conversation
import useConversation from "../../zustand/useConversation";
// Custom hook to fetch all available conversations for the current user
import useGetConversations from "../../hooks/useGetConversations";
// Toast library for displaying error messages
import toast from "react-hot-toast";

// The SearchInput component allows users to search through their conversations
const SearchInput = () => {
	// Local state to store the user's search input
	const [search, setSearch] = useState("");
	// Function from Zustand store to update the currently selected conversation
	const { setSelectedConversation } = useConversation();
	// Get the list of all available conversations from the custom hook
	const { conversations } = useGetConversations();

	// Handles the form submission
	const handleSubmit = (e) => {// Prevent page reload
		e.preventDefault();
		// Do nothing if the input is empty
		if (!search) return;
		// Validate the input length
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}
		// Try to find a matching conversation by full name (case-insensitive)
		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		// If a match is found, set it as the selected conversation
		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");// Clear the search input
			// If no match, show an error toast
		} else toast.error("No such user found!");
	};
	return (
		// Form container with horizontal layout and spacing
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			{/* Search input field */}
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={search}
				// Update local state on input change
				onChange={(e) => setSearch(e.target.value)}
			/>
			{/* Submit button with search icon */}
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};

// Export the SearchInput component so it can be used in other files
export default SearchInput;
