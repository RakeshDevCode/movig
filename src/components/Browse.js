import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import MovieDetails from "./MovieDetails";
import { useEffect } from "react";

const Browse = () => {
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const showGptSearch = useSelector((Store) => Store.gpt.showGptSearch);

  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedMovie]);

  useNowPlayingMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      <MovieDetails />
    </div>
  );
};

export default Browse;
