import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

const Browse = () => {

  useNowPlayingMovies();
  useTopRatedMovies();
 
  return (
    <div>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
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


