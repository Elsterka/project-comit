// Importing useState to manage component state for form inputs
import { useState } from "react";
// Importing Link to navigate between routes without page reload
import { Link } from "react-router-dom";
// Custom hook that contains the login logic (e.g., API request, loading state)
import useLogin from "../../hooks/useLogin";

const Login = () => {
	// State to manage the input fields for username and password
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// Extracting loading state and login function from custom login hook
	const { loading, login } = useLogin();

	// Handles form submission
	// Prevents default form behavior and triggers login function
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		// Centering the login form on the screen
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			{/* Card-style container with blur and shadow effects */}
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				{/* Title of the form */}
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-900'> ChatApp</span>
				</h1>
				{/* Login form */}
				<form onSubmit={handleSubmit}>
					{/* Username input field */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={username}
							// Updates username state on input
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					{/* Password input field */}
					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={password}
							// Updates password state on input
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{/* Link to Sign Up page if user doesn't have an account */}
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					{/* Submit button with loading indicator if login is in progress */}
					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
// Exporting the Login component so it can be imported and rendered in routes or other components
export default Login;
