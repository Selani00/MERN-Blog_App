import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO).then(
    () => {
        console.log("Connected to database!!");
    }).catch((err) => {console.log(err);
    });
    

const app = express();

// This will allow us to parse the request body.
app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server is running on port 3000!!");
})

// request is the data that send to the API. response is the data that we recive from the API.
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);