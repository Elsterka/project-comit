// Import subcomponents used in the sidebar
// Import the Conversations component,
// which shows the list of user chats
import Conversations from "./Conversations";
// Import the LogoutButton component, 
// used to log out the current user
import LogoutButton from "./LogoutButton";
// Import the SearchInput component, 
// used to search for users or chats
import SearchInput from "./SearchInput";

// Sidebar component -displayed on the left side of the chat app
// It includes a search bar, a list of conversations, and a logout button
const Sidebar = () => {
	return (
		// Container for the entire sidebar
		// - 'border-r' adds a right border
		// - 'border-slate-500' sets the border color
		// - 'p-4' applies padding
		// - 'flex flex-col' arranges children in a vertical stack
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			{/* Search bar at the top of the sidebar */}
			{/* Allows users to search for other users or start a new chat */}
			<SearchInput />
			{/* Visual divider between the search bar and conversation list */}
			{/* 'px-3' adds horizontal padding around the divider */}
			<div className='divider px-3'></div>

			{/* Displays the list of conversations (active or recent chats) */}
			<Conversations />
			{/* Logout button at the bottom of the sidebar */}
			{/* Allows the authenticated user to end their session */}
			<LogoutButton />
		</div>
	);
};
// Export the Sidebar component as the default export of this file
// This makes it easy to import without using curly braces
export default Sidebar;

