import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import  {errorHandler}  from "../utilts/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res,next) => {
  const {email,password}= req.body;

  if (!email || !password || email === " " || password === " ") {
    next(errorHandler(400, "All fields are required!!" ));
  }

  try{

    const validuser= await User.findOne({email});


    if(!validuser ){
      return next(errorHandler(400, "User not found" ));
    }

    const validPassword= bcryptjs.compareSync(password,validuser.password);

    if(!validPassword){
      return next(errorHandler(400, "Invalid password" ));
    }

    const token =jwt.sign(
      {id : validuser._id, }, 
      // secret key is unique key for that is only for you.
      process.env.JWT_SECRET); // As long as the browser is open, the cookie will be stored in the browser.

      // need to separate the password from the user object
      const { password: pass, ...rest} = validuser._doc;

      res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
      

  }catch(err){
    next(err);
  }
}
