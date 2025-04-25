// Importing Link from react-router-dom
//  to navigate between routes without reloading the page
import { Link } from "react-router-dom";
// GenderCheckbox is a reusable component for selecting gender via checkboxes
import GenderCheckbox from "./GenderCheckbox";
// Importing useState to manage form input state
import { useState } from "react";
// Custom hook for handling signup logic (probably includes API calls and validation)
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	// Defining initial form input values using useState hook
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});
	// Destructuring loading state and signup function from the custom hook
	const { loading, signup } = useSignup();

	// Updates the gender value in the form state
	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	// Handles form submission and calls signup function with input values
	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		// Container that centers the form in the middle of the screen
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			{/* Form wrapper with styling for blur background and soft borders */}
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				{/* Signup form with controlled inputs */}
				<form onSubmit={handleSubmit}>

					{/* Full Name Field */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>
					{/* Username Input */}
					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>
					{/* Password Input */}
					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>
					{/* Confirm Password Input */}
					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>
					{/* Gender checkbox component (reusable) */}
					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					{/* Link to Login Page for existing users */}
					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// Exporting the SignUp component as the default export 
// so it can be imported elsewhere in the app
export default SignUp;
