import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { signInScuccess, signInFailure, signInStart } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../Components/OAuth";


const SignIn = () => {
  const [formData, setFormData] = useState({});

  const [buttonEnabled, setButtonEnabled] = useState(false);
  const {loading, error: errorMessage} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    // Prevent the refresh of the page after submit
    e.preventDefault();

    // Check if the user has filled in all the fields
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);

      dispatch(signInStart()); // This is same as setLoading(true); and   setErrorMessage(null);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Convert the object to a JSON string
        body: JSON.stringify(formData),
      });
      // to use this we get this
      const data = await res.json();

      // It the request is not successful, display the error message
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // This is same as setErrorMessage(data.message) and setLoading(false
      }

      
      
      if (res.ok){
        dispatch(signInScuccess(data)); 
        navigate("/");
      }

      
    } catch (err) {
      // setErrorMessage(err.message);
      // setLoading(false);

      dispatch(signInFailure(err.message)); // This is same as setErrorMessage(err.message) and setLoading(false)
    }
  };

  // To handle the loading effect
  // const handleButtonClick =()=>{
  //   setLoading(true);
  //   setTimeout(()=>{
  //     setLoading(false);
  //     setButtonEnabled(false);
  //   },2000);
  // };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sahand's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project . You can sign in with your email and
            password or google
          </p>
        </div>

        {/*  right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            

            <div>
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={handleChange}
              ></TextInput>
            </div>

            <div>
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                placeholder="************"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
              // onClick={handleButtonClick}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loding</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth/>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account ?</span>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn
