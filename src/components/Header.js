import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, } from "react-router";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import React,{ useEffect } from 'react';
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
     
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const {uid, email,displayName, photoURL} = user;
    dispatch(addUser({uid: uid, email: email,displayName: displayName, photoURL: photoURL }));
    navigate("/browse")
  } else {
    dispatch(removeUser());
    navigate("/");
  }
});
     return () => unsubscribe(); // cleanup on unmount
  },[dispatch]);

  const handleGptSearchClick= ()=>{
    //toggle Gpt search 
    dispatch(toggleGptSearchView());
    
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black  z-10 flex justify-between">
      <img className="w-44 " src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          <button className="bg-red-500 text-white py-2 px-4 mx-4 my-2 rounded-lg"
          onClick={handleGptSearchClick}
          >
            GPT Search
          </button>
          <img className="w-12 h-12 " alt="usericon" src={user.photoURL} />
          <button onClick={handleSignOut} className="font-bold text-white">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;