// Import React's useEffect and useRef hooks
import { useEffect, useRef } from "react";
// Custom hook to fetch messages for the selected conversation
import useGetMessages from "../../hooks/useGetMessages";
// Skeleton component to show placeholder messages while loading
import MessageSkeleton from "../skeletons/MessageSkeleton";
// Component to render individual message content
import Message from "./Message";
// Custom hook to listen for incoming real-time messages via sockets
import useListenMessages from "../../hooks/useListenMessages";

// The Messages component renders the list of 
// chat messages for the selected conversation
const Messages = () => {
	// Destructure messages array and loading state from the custom hook
	const { messages, loading } = useGetMessages();
	// Listen for new real-time messages and update message list
	useListenMessages();
	// Ref to track the last message element — used for auto-scrolling
	const lastMessageRef = useRef();
	// Scroll to the last message every time the messages array changes
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		// Main message container
		// - 'px-4': horizontal padding
		// - 'flex-1': grow to fill available vertical space
		// - 'overflow-auto': allow scrolling when content exceeds height
		<div className='px-4 flex-1 overflow-auto'>
			{/* If not loading and there are messages, map through and render them */}
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					// Wrap each message in a div and attach the ref to the last one
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
			{/* If loading, show 3 skeleton loaders to mimic messages */}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{/* If not loading and no messages exist, show a placeholder message */}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
// Export the Messages component so it can be used in other parts of the app
export default Messages;