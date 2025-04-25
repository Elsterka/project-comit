// Import routing components from react-router-dom
import { Navigate, Route, Routes } from "react-router-dom";
// Import global styles for the App
import "./App.css";
// Importing page components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
// Import toaster for displaying toast notifications
import { Toaster } from "react-hot-toast";
// Importing custom hook to access authentication context
import { useAuthContext } from "./context/AuthContext";

function App() {
	// Destructure the authenticated user from context
	const { authUser } = useAuthContext();
	return (
		// Basic container with padding, 
		// full screen height, and centered content using TailwindCSS
		<div className='p-4 h-screen flex items-center justify-center'>
			{/* Define application routes using React Router */}
			<Routes>
				{/* Home route: 
				if user is authenticated, show Home page, else redirect to Login */}
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				{/* Login route: 
				if user is already authenticated, redirect to Home, else show Login page */}
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				{/* SignUp route: 
				same logic as Login, redirect authenticated users to Home */}
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			{/* Toast notifications container – allows toast messages to appear */}
			<Toaster />
		</div>
	);
}

export default App;
