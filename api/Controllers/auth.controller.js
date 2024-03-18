import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
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
    return res.status(400).json({ message: "All fields are required" });
  }

  // to hash the password
  const hashpassword= bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashpassword});

  try {
    await newUser.save();
    res.json("Signup success!!");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // to save the user in the database
  
};
