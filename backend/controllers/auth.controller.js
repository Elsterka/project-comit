// Importing required modules
import bcrypt from "bcryptjs";// For hashing passwords
import User from "../models/user.model.js";// Importing the User model for interacting with the database
import generateTokenAndSetCookie from "../utils/generateToken.js";// Importing the function to generate JWT and set the cookie

// Controller function for user signup
export const signup = async (req, res) => {
    //return function, receive response
    try {
        // Destructuring user details from the request body
        const {
            fullName, username, password, confirmPassword, gender   /*check in postman*/ } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        //check if user exist in the DB
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        //hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create profile picture based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create a new user document with the provided details
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        // If user creation is successful, generate a token and save the user to the database
        if (newUser) {
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();


            // Send a success response with the new user's details (excluding password)
            res.status(201).json({
                //data from DB
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//res.send("signupUser");
//console.log("signupUser");

// Controller function for user login
export const login = async (req, res) => {
    try {
        // Destructuring username and password from the request body
        const { username, password } = req.body;
        // Search for the user in the database by username
        const user = await User.findOne({ username });
        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        // If no user is found or the password is incorrect, return an error
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate a JWT token and set it in the cookie for the logged-in user
        generateTokenAndSetCookie(user._id, res); //send payload and receive response

        // Send a success response with the user's details (excluding password)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        // If there's an error during the login process, log it and send a 500 server error response
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller function for user logout
export const logout = (req, res) => {
    try {
        // Clear the JWT token cookie by setting its expiration to 0
        res.cookie("jwt", "", { maxAge: 0 });
        // Send a success response indicating the user has logged out
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


