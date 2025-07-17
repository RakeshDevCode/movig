import { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  const [imgError, setImgError] = useState(false);

  if (!posterPath || imgError) return null;

  return (
    <div className="w-48 pr-4">
      <img
        alt="Movies cardImage"
        src={IMG_CDN_URL + posterPath}
        onError={() => setImgError(true)} // Hide card if image fail to fetch/load
      />
    </div>
  );
};

export default MovieCard;
