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

      // need to separate the password from the user object. To hide the hash password form browser inspect
      const { password: pass, ...rest} = validuser._doc;

      res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
      

  }catch(err){
    next(err);
  }
}

export const google = async (req, res,next) => {
  const {email,name,googlePhotoUrl}= req.body;

  try{
    // find the user in the database
    const user = await User.findOne({email});
    //if user exists
    if(user){
      const token =jwt.sign({id:user._id},process.env.JWT_SECRET);
      const {password, ...rest} = user._doc;
      res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest); // As long as the browser is open, the cookie will be stored in the browser.
    }else{

      // create random password. cz user model is required password field
      const generatedPassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8); 

      const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
      const newUser = new User({
        username:name.toLowerCase().split(' ').join('')+ Math.random().toString(9).slice(-4), // Here we change the user name 
        email,
        password:hashedPassword,
        profilePicture: googlePhotoUrl,

      },);
      await newUser.save();

      const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      const {password, ...rest} = newUser._doc;
      res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest); // As long as the browser is open, the cookie will be stored in the browser.
    }

  }catch(err){

    console.log(err);
  }
}
