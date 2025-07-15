import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import React, { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGE } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full sm:w-screen px-4 sm:px-8 py-2 sm:py-2 bg-gradient-to-b from-black z-10 flex flex-col sm:flex-row sm:justify-between">
      {/* Logo and Right Side Actions in One Row */}
      <div className="w-full flex flex-wrap justify-between items-center">
        {/* Logo */}
        <img className="w-32 sm:w-44 mb-2 sm:mb-0" src={LOGO} alt="logo" />

        {/* User actions (GPT button, language, user icon, sign out) */}
        {user && (
          <div className="flex flex-row items-center gap-2 flex-wrap justify-end">
            {showGptSearch && (
              <select
                className="p-2 bg-gray-900 text-white rounded"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGE.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>

            <img
              className="w-10 h-10 rounded-full"
              alt="usericon"
              src={user.photoURL}
            />
            <button
              onClick={handleSignOut}
              className="font-bold text-white text-sm sm:text-base"
            >
              (Sign Out)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
