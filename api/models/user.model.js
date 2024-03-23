import mongoose from "mongoose";

// User model
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password :{
        type: String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.dNfuZjZeZUmYxsqHRhYtSQHaHa?w=181&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },

},{timestampe:true})
// need to add time of creation and time of update . That's why we use timestampe:true . So that it will automatically add time of creation and time of update.

// create a model. Name is User . mongodb automatically create a collection with the name of users.
const User = mongoose.model("User",userSchema);

export default User;

