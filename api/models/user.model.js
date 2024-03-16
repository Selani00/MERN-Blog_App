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

},{timestampe:true})
// need to add time of creation and time of update . That's why we use timestampe:true . So that it will automatically add time of creation and time of update.

// create a model. Name is User . mongodb automatically create a collection with the name of users.
const User = mongoose.model("User",userSchema);

export default User;

