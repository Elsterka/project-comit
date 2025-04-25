// Import logout icon from react-icons (Bi = BoxIcons)
import { BiLogOut } from "react-icons/bi";
// Import the custom hook that handles the logout process
import useLogout from "../../hooks/useLogout";

// LogoutButton component allows the user to log out of the application
const LogoutButton = () => {
	// Destructure the logout function 
	// and loading state from the custom hook
	const { loading, logout } = useLogout();

	return (
		// 'mt-auto' pushes the logout button to the bottom 
		// of the sidebar (if using flex-column layout)
		<div className='mt-auto'>
			{/* If not currently logging out, show the logout icon */}
			{!loading ? (
				// Style the icon
				<BiLogOut className='w-6 h-6 text-white cursor-pointer'
					// Call the logout function when clicked
					onClick={logout} />

			) : (
				// If logout is in progress, show a loading 
				// spinner instead of the icon
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;
