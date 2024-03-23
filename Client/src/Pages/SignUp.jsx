import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import OAuth from "../Components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    // Prevent the refresh of the page after submit
    e.preventDefault();

    // Check if the user has filled in all the fields
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill in all the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Convert the object to a JSON string
        body: JSON.stringify(formData),
      });
      // to use this we get this
      const data = await res.json();

      // It the request is not successful, display the error message
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      
      if (res.ok){
        navigate("/signin");
      }

      
    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

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
            This is a demo project . You can sign up with your email and
            password or google
          </p>
        </div>

        {/*  right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Name"></Label>
              <TextInput
                type="text"
                placeholder="UserName"
                id="username"
                onChange={handleChange}
              ></TextInput>
            </div>

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
                placeholder="Password"
                id="password"
                onChange={handleChange}
              ></TextInput>
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loding</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
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
};

export default SignUp;
