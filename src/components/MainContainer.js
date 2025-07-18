import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const mainMovie = useSelector((store) => store.movies?.mainMovie);

  if (!movies || movies.length === 0) return null;

  // If mainMovie exists (set from MovieDetails), use it; else default to first nowPlaying movie
  const movieToShow = mainMovie || movies[0];

  const { original_title, overview, id } = movieToShow;

  return (
    <div className="relative">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
