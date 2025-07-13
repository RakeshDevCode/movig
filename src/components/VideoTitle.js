import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[30%] px-6 sm:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl sm:text-6xl font-bold w-3/4">{title}</h1>
      <p className="py-0 sm:py-6 text-sm sm:text-lg w-8/12 sm:w-4/12 line-clamp-1">
        {overview}
      </p>
      <div className="py-2 sm:py-4">
        <button className="bg-white text-black text-sm sm:text-xl px-4 sm:px-12 py-2 sm:py-4 rounded-lg hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="bg-white text-black text-sm sm:text-xl px-4 sm:px-12 py-2 sm:py-4 rounded-lg hover:bg-opacity-80 mx-2">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
