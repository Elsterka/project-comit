// React hook for handling side effects
import { useEffect } from "react";
// Custom hook to access and update selected conversation state
import useConversation from "../../zustand/useConversation";
// Input component for typing messages
import MessageInput from "./MessageInput";
// Component that displays the conversation messages
import Messages from "./Messages";
// Icon to display when no chat is selected
import { TiMessages } from "react-icons/ti";
// Hook to access the authenticated user's context
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	// Clean up selected conversation on component unmount
	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		// Main container with minimum width and flex layout
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Chat header showing the selected user's name */}
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					{/* Component to display the list of messages */}
					<Messages />
					{/* Component to input and send a new message */}
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;


// Component to display when no chat is selected
const NoChatSelected = () => {
	// Destructuring authUser from useAuthContext hook 
	// to get the current authenticated user
	const { authUser } = useAuthContext();
	return (

		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				{/* Display a greeting message using the full name 
				of the authenticated user */}
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
