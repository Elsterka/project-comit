//Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. 
// It provides a uniform API for accessing numerous different databases, including Redis, MySQL, LDAP, MongoDB, and Postgres.
import mongoose from "mongoose";// Import mongoose to interact with MongoDB

// Define an asynchronous function to connect to MongoDB
const connectToMongoDB = async () => {
    try {
        //.env file MongoDB string
        await mongoose.connect(process.env.MONGO_DB_URI,)// Attempt to connect to MongoDB using the URI stored in environment variables
        //message of successfull connection to DB
        console.log("Connected to MongoDB");
    } catch (error) {
        //message of NOT successfull connection to DB
        console.log("Error connecting to MongoDB", error.message)

    }
}
// Export the connectToMongoDB function so it can be used in other parts of the application
export default connectToMongoDB;