// Import the socket context to access real-time online user status
import { useSocketContext } from "../../context/SocketContext";
// Import Zustand store to manage selected conversation state
import useConversation from "../../zustand/useConversation";

// The Conversation component represents a single user/conversation in the list
const Conversation = ({ conversation, lastIdx, emoji }) => {
	// Get selected conversation state and function to update it
	const { selectedConversation, setSelectedConversation } = useConversation();
	// Determine if this conversation is currently selected (highlight it if so)
	const isSelected = selectedConversation?._id === conversation._id;
	// Get the list of online users from the socket context
	const { onlineUsers } = useSocketContext();
	// Determine if this conversation’s user is currently online
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			{/* Main conversation item container */}
			{/* Highlight with a background if selected or hovered over */}
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""} 
			`}// Apply blue background if selected

				// Set this conversation as selected on click
				onClick={() => setSelectedConversation(conversation)}
			>
				{/* Avatar section with online indicator */}
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						{/* Show user's profile picture */}
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>
				{/* Text and emoji layout */}
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						{/* User's name */}
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						{/* Random emoji passed as prop */}
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>
			{/* Render a divider between conversations, except after the last one */}
			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
// Export the Conversation component for use in the Conversations list
export default Conversation;