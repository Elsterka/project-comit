//Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. 
// It provides a uniform API for accessing numerous different databases, including Redis, MySQL, LDAP, MongoDB, and Postgres.
import mongoose from "mongoose";


// user model acc. Schema
//The userSchema specifies fields ( fullName, username, password, cofirmPassword, gender ) 
// with their respective data types ( String , Number , Date ) 
// and additional options ( required , unique , default , min ).
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,//data types
        required: true//additional options
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilePic: {
        type: String,
        default: "",
    },
    // createdAt, updatedAt => Member since <createdAt>
},
    { timestamps: true }
);

// Create a Mongoose model named "User" using the defined userSchema
// This line binds the schema to the "User" collection in MongoDB
const User = mongoose.model("User", userSchema);

//Export default and export with named exports are two ways to export code from a JavaScript module. 
// export default is used to export a single value as the default export, 
// while export with named exports is used to export multiple values as named exports.
export default User;