import { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { addSelectedMovie, setMainMovie } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const MovieCard = ({ posterPath, movie }) => {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);
  const handleMovieDetails = () => {
    dispatch(addSelectedMovie(movie));
    dispatch(setMainMovie(movie));
  };

  if (!posterPath || imgError) return null;

  return (
    <div className="w-48 pr-4 " onClick={handleMovieDetails}>
      <img
        alt="Movies cardImage"
        src={IMG_CDN_URL + posterPath}
        onError={() => setImgError(true)} // Hide card if image fail to fetch/load
      />
    </div>
  );
};

export default MovieCard;
