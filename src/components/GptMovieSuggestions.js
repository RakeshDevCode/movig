import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  if (!movieNames) return null;

  return (
    <div className="p-2 m-2 sm:p-4 sm:m-4 text-white">
      <div>
        {/* GPT Results */}
        {movieResults && (
          <div className="bg-black mt-0 sm:mt-6 p-0 sm:p-6 w-full max-w-3xl rounded-lg shadow-md whitespace-pre-line text-white leading-relaxed">
            <h1 className="text-xl font-semibold mb-2 text-white">
              🎬 Recommended Movies:
            </h1>
            <div>
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
    </div>
  );
};

export default GptMovieSuggestions;
