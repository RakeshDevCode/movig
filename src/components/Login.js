import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BackGroundImage, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    let message;
    if (isSignInForm) {
      message = checkValidData(
        "",
        email.current?.value,
        password.current?.value
      );
    } else {
      message = checkValidData(
        name.current?.value,
        email.current?.value,
        password.current?.value
      );
    }
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0 -z-10">
        <img
          src={BackGroundImage}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center min-h-screen ">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-black bg-opacity-80 text-white rounded-lg p-8 sm:p-12 w-11/12 sm:w-3/4 md:w-2/4 lg:w-3/12"
        >
          <h1 className="text-2xl sm:text-3xl font-bold p-2 text-center">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-3 w-full bg-gray-700 rounded"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Enter your Email ID"
            className="p-4 my-3 w-full bg-gray-700 rounded"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-3 w-full bg-gray-700 rounded"
          />

          <p className="text-red-600 font-bold text-sm sm:text-lg py-2">
            {errorMessage}
          </p>

          <button
            className="p-3 sm:p-4 my-4 bg-red-700 font-bold w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="text-center">Or</p>

          <p
            className="text-center text-sm sm:text-base mt-4 hover:cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? (
              <>
                <span className="text-gray-400">New to Movig? </span>
                <span className="font-bold">Sign Up Now</span>
              </>
            ) : (
              <>
                <span className="text-gray-400">Already registered? </span>
                <span className="font-bold">Sign In Now</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
