import React from "react";
import Header from "./Header";

const Login = () => {
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
        <form className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
          <h1 className="font-bold  p-2 m-2">Sign In</h1>
          <input
            type="text "
            placeholder="Email or Mobile number"
            className="p-4 my-4 w-full bg-gray-700 "
          />
          <input
            type="password "
            placeholder="password"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <button className="p-4 my-6 bg-red-700 font-bold w-full rounded-lg">
            Sign In
          </button>
          <p className="text-center">Or </p>
          <h1 className="font-bold  p-2 m-2 w-full">
            <span className="text-gray-500"> New to Netflix?</span>{" "}
            <span className="hover:cursor-pointer">Sign Up Now</span>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
