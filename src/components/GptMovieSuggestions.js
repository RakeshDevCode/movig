import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  if (!movieNames) return null;

  return (
    <div className="px-4 sm:px-8 py-6 w-full max-w-screen-2xl mx-auto">
      {movieResults && (
        <div className="bg-black bg-opacity-90 rounded-lg shadow-md p-4 sm:p-6">
          <h1 className="text-lg sm:text-2xl font-semibold mb-4 text-white">
            🎬 Recommended Movies:
          </h1>
          <div className="space-y-6">
            {movieNames.map((name, index) => (
              <MovieList
                key={index}
                title={name}
                movies={movieResults[index]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GptMovieSuggestions;
