import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  };

  const handleSubmit = async(e)=>{
    // Prevent the refresh of the page after submit
    e.prevenDefault();
    try{
      const res = await fetch ('/api/auth/signup', {
        method: 'POST',
        headers :{ 'Content-Type': 'application/json'}, 
        // Convert the object to a JSON string
        body: JSON.stringify(formData)
      });
      // to use this we get this
      const data = await res.json();

    }catch(err){

    }
  }
  
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sahand's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">This is a demo project . You can sign up with your email and password or google</p>
        </div>

        {/*  right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Name"></Label>
              <TextInput type="text" placeholder="UserName" id='username'  onChange={handleChange}></TextInput>
            </div>

            <div>
              <Label value="Your Email"></Label>
              <TextInput type="email" placeholder="example@gmail.com" id='email' onChange={handleChange}></TextInput>
            </div>

            <div>
              <Label value="Your Password"></Label>
              <TextInput type="password" placeholder="Password" id='password' onChange={handleChange}></TextInput>
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to='/signin' className="text-blue-500 hover:underline">Sign In</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
