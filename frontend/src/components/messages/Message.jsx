// Importing necessary hooks and utilities
// Context to get the current authenticated user
import { useAuthContext } from "../../context/AuthContext";
// Utility to format message timestamps
import { extractTime } from "../../utils/extractTime";
// Zustand store to access selected conversation data
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	// Retrieve the current authenticated user from context
	const { authUser } = useAuthContext();
	// Get the selected conversation from Zustand store
	const { selectedConversation } = useConversation();
	// Check if the message was sent by the current authenticated user
	const fromMe = message.senderId === authUser._id;
	// Format the timestamp of the message using the extractTime utility
	const formattedTime = extractTime(message.createdAt);
	// Determine the CSS class for message alignment: 
	// "chat-end" for messages sent by the user, "chat-start" for others
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	// Set the profile picture based on 
	// who sent the message (self or other user in the conversation)
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	// Background color for the message bubble: 
	// blue if sent by the user, otherwise default
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	// If the message should shake (based on 
	// some condition in the message object), add the "shake" class
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			{/* Profile image for the sender */}
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					{/* Display the profile image */}
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			{/* Chat bubble showing the message text with dynamic styling */}
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			{/* Footer showing the formatted message timestamp */}
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
				{/* Display formatted time */}
				{formattedTime}</div>
		</div>
	);
};
// Exporting the Message component to be used in other parts of the application
export default Message;
