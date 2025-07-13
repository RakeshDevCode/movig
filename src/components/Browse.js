import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";

const Browse = () => {
  useNowPlayingMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      <GptSearch/>
      <MainContainer />
      <SecondaryContainer />
      {/* MainContainer
          - Video Background
          - VideoTitle
          Secondary Container
          - Movies List *n
            - cards *n
       */}
    </div>
  );
};

export default Browse;
