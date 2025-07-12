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
    //validate the form data
    //console.log(name.current.value,email.current.value,password.current.value);
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
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
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

              // Profile updated!
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BackGroundImage} alt="logo" />
      </div>
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute p-12 bg-black w-3/12  my-14 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        >
          <h1 className="text-3xl font-bold p-2 m-2 ">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Enter your Email ID "
            className="p-4 my-4 w-full bg-gray-700 "
          />
          <input
            ref={password}
            type="password"
            placeholder="password"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
          <button
            className="p-4 my-6 bg-red-700 font-bold w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-center">Or </p>
          <p
            className="p-4 m-4 w-full hover:cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? (
              <>
                <span className="text-gray-400">New to Movig? </span>
                <span className="font-bold">Sign Up Now</span>
              </>
            ) : (
              <>
                <span className="text-gray-400">Already registred, </span>
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
