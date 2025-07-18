import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    topRatedMovies: null,
    upcomingMovies: null,
    selectedMovie: null,
    mainMovie: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setMainMovie: (state, action) => {
      state.mainMovie = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addTopRatedMovies,
  addUpcomingMovies,
  addSelectedMovie,
  setMainMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;
