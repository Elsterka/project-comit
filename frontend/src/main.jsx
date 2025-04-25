// Importing React to enable JSX syntax and use of React functionalities
import React from "react";
// Importing ReactDOM to interact with the DOM in a React environment
import ReactDOM from "react-dom/client";
// Importing the main App component which serves as the root component of the application
import App from "./App.jsx";
// Importing global CSS styling
import "./index.css";
// Importing BrowserRouter for enabling routing in the app using React Router
import { BrowserRouter } from "react-router-dom";
// Importing the AuthContextProvider which likely provides authentication state and logic to the app
import { AuthContextProvider } from "./context/AuthContext.jsx";
// Importing the SocketContextProvider which likely handles real-time communication using WebSockets
import { SocketContextProvider } from "./context/SocketContext.jsx";

// Rendering the React application inside the root DOM node
ReactDOM.createRoot(document.getElementById("root")).render(
	/* Helps identify potential problems in an application by 
	activating extra checks and warnings in development mode */
	<React.StrictMode>
		{/* Enables navigation and routing using React Router */}
		<BrowserRouter>
			{/* Provides authentication context to all child components */}
			<AuthContextProvider>
				{/* Provides WebSocket or socket.io context to all child components */}
				<SocketContextProvider>
					<App />
				</SocketContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
