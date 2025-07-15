import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [gptResults, setGptResults] = useState(""); // <-- Store GPT output here
  const [loading, setLoading] = useState(false);

  const handleGptSearchClick = async () => {
    const userMessage = searchText.current.value;
    if (!userMessage) return;

    setLoading(true);
    setGptResults("");

    try {
      const res = await fetch("/api/gpt-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a movie recommendation engine." },
            { role: "user", content: userMessage },
          ],
        }),
      });

      const data = await res.json();
      setGptResults(data.response);
    } catch (error) {
      console.error("GPT Error:", error);
      setGptResults("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex flex-col items-center px-4">
      {/* Search Bar */}
      <form
        className="bg-black w-full max-w-3xl grid grid-cols-12 rounded-lg shadow-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg text-black"
          placeholder={lang[langKey].GptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 hover:bg-red-800 col-span-3 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {loading ? "Searching..." : lang[langKey].search}
        </button>
      </form>

      {/* GPT Results */}
      {gptResults && (
        <div className="bg-black mt-6 p-6 w-full max-w-3xl rounded-lg shadow-md whitespace-pre-line text-white leading-relaxed">
          <h2 className="text-xl font-semibold mb-2 text-white">🎬 Recommended Movies:</h2>
          <p>{gptResults}</p>
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
