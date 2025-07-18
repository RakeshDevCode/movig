import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Guard clause: check if movies is not null and has at least one item
  if (!movies || movies.length === 0) {
    return (
      <div>
        <h1>{title}</h1>
        <p>No movies available.</p>
      </div>
    );
  }

  return (
    <div className="px-6 ">
      <h1 className="text-4xl py-2 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movies) => (
            <MovieCard
              key={movies.id}
              posterPath={movies.poster_path}
              movie={movies}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
