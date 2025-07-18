import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [gptResults, setGptResults] = useState(""); // <-- Store GPT output here
  const [loading, setLoading] = useState(false);

  //Search Movies in TMDB by API Call
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie.trim() + // trim to avoid extra spaces
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const userMessage = searchText.current.value;
    if (!userMessage) return;

    setLoading(true);
    setGptResults("");

    const baseUrl =
      window.location.hostname === "localhost" ? "http://localhost:3001" : "";

    try {
      const res = await fetch(`${baseUrl}/api/gpt-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a movie recommendation engine. Respond with only movies title name, with comma seperated like the example result given ahead .Example: Sholay, Deewaar, Don, Kaala, Mr. Natwarlal . Do not include any description or additional details. ",
            },
            { role: "user", content: userMessage },
          ],
        }),
      });

      const data = await res.json();
      setGptResults(data.response);

      // API results
      const gptMovies = data.response.split(",");
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }),
      );
    } catch (error) {
      console.error("GPT Error:", error);
      setGptResults("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[35%] sm:pt-[10%] flex flex-col items-center px-4">
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
          className="py-4 sm:py-2 px-2 sm:px-4 mr-2 mt-4 mb-4 sm:m-4 bg-red-700 hover:bg-red-800 col-span-3 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {loading ? "Searching..." : lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
