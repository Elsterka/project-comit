// Import React's useState for local input state
import { useState } from "react";
// Import the send icon from react-icons (Bootstrap icons)
import { BsSend } from "react-icons/bs";
// Import custom hook to handle message sending logic
import useSendMessage from "../../hooks/useSendMessage";

// MessageInput is the text input + send button component for sending messages
const MessageInput = () => {
	// State to store the content of the message input field
	const [message, setMessage] = useState("");
	// Destructure the loading state and sendMessage function from the custom hook
	const { loading, sendMessage } = useSendMessage();
	// Handle form submission event
	const handleSubmit = async (e) => {
		// Prevent default form submission (which would reload the page)
		e.preventDefault();
		// Don't allow sending empty messages
		if (!message) return;
		// Send the message using the custom hook
		await sendMessage(message);
		// Clear the input field after the message is sent
		setMessage("");
	};

	return (
		// Form container with padding and vertical spacing
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			{/* Wrapper to position the send button inside the input field */}
			<div className='w-full relative'>
				{/* Text input for the user to type their message */}
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					// Update message state on each keystroke
					onChange={(e) => setMessage(e.target.value)}
				/>
				{/* Send button positioned inside the input field to the right */}
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{/* Show loading spinner while message is being sent, otherwise show send icon */}
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
// Export the component to be used in the chat UI
export default MessageInput;
