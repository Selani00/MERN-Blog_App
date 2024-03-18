import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import  {errorHandler}  from "../utilts/error.js";

export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;

  // for extra security
  if (
    !username ||
    !email ||
    !password ||
    username === " " ||
    email === " " ||
    password === " "
  ) {
    next(errorHandler(400, "All fields are required!!" ));
  }

  // to hash the password
  const hashpassword= bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashpassword});

  try {
    await newUser.save();
    res.json("Signup success!!");
  } catch (err) {
    next(err);
  }

  // to save the user in the database
  
};
