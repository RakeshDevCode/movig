import { useSelector, useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { addSelectedMovie, setMainMovie } from "../utils/moviesSlice";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useState } from "react";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedMovie);
  const trailer = useSelector((state) => state.movies.trailerVideo);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  useMovieTrailer(movie?.id);
  if (!movie) return null;

  const handleClose = () => {
    dispatch(addSelectedMovie(null));
    setShowPlayer(false);
  };

  const handleWatchTrailer = () => {
    if (trailer) {
      setShowPlayer(true);
      dispatch(setMainMovie(movie));
    } else alert("Trailer not available.");
  };

  return (
    <>
      {/* Fullscreen Trailer Overlay */}
      {showPlayer && trailer && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="relative w-full h-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
              title="YouTube Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-3xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Movie Details Modal */}
      {!showPlayer && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70 px-2">
          <div className="relative bg-gray-900 text-white p-4 md:p-6 rounded-lg shadow-xl max-w-4xl w-full overflow-y-auto max-h-[95vh]">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-500"
            >
              ×
            </button>

            <div className="flex flex-col md:flex-row">
              <img
                src={IMG_CDN_URL + movie.poster_path}
                alt={movie.title}
                className="w-[80%] md:w-64 rounded-lg shadow-lg mb-4 md:mb-0"
              />
              <div className="md:ml-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {movie.title}
                  </h2>

                  {/* Overview with line clamp on mobile */}
                  <p
                    className={`text-gray-300 mb-2 ${
                      !showFullOverview ? "line-clamp-2" : ""
                    }`}
                  >
                    {movie.overview}
                  </p>
                  {movie.overview.length > 100 && (
                    <button
                      onClick={() => setShowFullOverview(!showFullOverview)}
                      className="text-purple-400 text-sm mb-4"
                    >
                      {showFullOverview ? "Show Less" : "Load More"}
                    </button>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm mb-2">
                    <p>
                      <strong>Rating:</strong> {movie.vote_average}
                    </p>
                    <p>
                      <strong>Release:</strong> {movie.release_date}
                    </p>
                    <p>
                      <strong>Language:</strong>{" "}
                      {movie.original_language?.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-6">
                  <button
                    onClick={handleWatchTrailer}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md w-full md:w-auto"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
