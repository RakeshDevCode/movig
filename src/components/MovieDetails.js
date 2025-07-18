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

  // ✅ Valid use of hook: outside condition but guarded
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
              frameBorder="0"
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
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-gray-900 text-white p-6 rounded-lg shadow-xl max-w-4xl w-full mx-4">
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
                className="w-full md:w-64 rounded-lg shadow-lg"
              />
              <div className="md:ml-6 mt-4 md:mt-0 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-gray-300 mb-4">{movie.overview}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
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
                <div className="mt-6">
                  <button
                    onClick={handleWatchTrailer}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md"
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
