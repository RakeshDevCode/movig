import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieVideos = async () => {
      if (!movieId) return; // Guard against undefined movieId

      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );

        const json = await data.json();

        if (!json.results || !Array.isArray(json.results)) {
          console.warn("Trailer data missing or malformed:", json);
          return;
        }

        const filterTrailer = json.results.filter(
          (video) => video.type === "Trailer"
        );
        const trailer = filterTrailer.length
          ? filterTrailer[0]
          : json.results[0];
        if (trailer) dispatch(addTrailerVideo(trailer));
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    getMovieVideos();
  }, [movieId, dispatch]); // ✅ Make sure dispatch is in deps
};

export default useMovieTrailer;
