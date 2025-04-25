// Import the custom hook that fetches conversation 
// data from the server or cache
import useGetConversations from "../../hooks/useGetConversations";
// Utility function to return a random emoji — 
// used to give conversations a fun, unique flair 
import { getRandomEmoji } from "../../utils/emojis";
// Import the Conversation component, 
// which represents a single chat item in the list
import Conversation from "./Conversation";

// The Conversations component displays 
// a scrollable list of all conversations the user is part of
const Conversations = () => {
	// Destructure the loading state and the list 
	// of conversations from the custom hook
	const { loading, conversations } = useGetConversations();
	return (
		// Main container: vertical layout with 
		// scroll enabled when content overflows
		<div className='py-2 flex flex-col overflow-auto'>
			{/* Loop through each conversation and render a Conversation component */}
			{conversations.map((conversation, idx) => (
				<Conversation
					// Use unique conversation ID as the React key
					key={conversation._id}
					// Pass down the conversation object
					conversation={conversation}
					// Assign a random emoji to each conversation
					emoji={getRandomEmoji()}
					// Pass boolean if this is the last item
					lastIdx={idx === conversations.length - 1}
				/>
			))}
			{/* Show loading spinner if conversations are still being fetched */}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
// Export the Conversations component so it can be used elsewhere (in Sidebar)
export default Conversations;
