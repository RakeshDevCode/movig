  import React, { useRef, useState } from "react";
  import Header from "./Header";
  import { checkValidData } from "../utils/Validate";

  const Login = () => {
    const[isSignInForm, setSignInForm]=useState(true);
    const [errorMessage,setErrorMessage]=useState(null);

    const name=useRef(null);  
    const email=useRef(null);
    const password=useRef(null);

    const handleButtonClick=()=>{
      //validate the form data
      console.log(name.current.value,email.current.value,password.current.value);

      const message =checkValidData(name.current.value,email.current.value,password.current.value);
      setErrorMessage(message);
    
    }
    const toggleSignInForm=()=>{
      setSignInForm(!isSignInForm)

    }
    return (
      <div>
        <Header />
        <div className="absolute">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_large.jpg"
            alt="logo"
          />
        </div>
        <div>
          <form onSubmit={(e)=>e.preventDefault()} className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold  p-2 m-2">{isSignInForm? "Sign In": "Sign Up"}</h1>
            {!isSignInForm && <input
              ref={name}
              type="text "
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700"
            />}
            <input
              ref={email}
              type="text "
              placeholder="Email or Mobile number"
              className="p-4 my-4 w-full bg-gray-700 "
            />
            <input
              ref={password}
              type="password "
              placeholder="password"
              className="p-4 my-4 w-full bg-gray-700"
            />
            <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
            <button className="p-4 my-6 bg-red-700 font-bold w-full rounded-lg" onClick={handleButtonClick}>
              {isSignInForm? "Sign In": "Sign Up"}
            </button>
            <p className="text-center">Or </p>
            <p className="p-4 m-4 w-full hover:cursor-pointer" onClick={toggleSignInForm}>
              {isSignInForm? "New to Netflix? Sign Up Now": "Already registred User, Sign In Now"}</p>
          </form>
        </div>
      </div>
    );
  };

  export default Login;
    