"use client";

import { useState } from "react";

export default function SelectedServer({ episode }) {
  const [selectedServer, setSelectedServer] = useState(episode.videoServer[0]);

  return (
    <>
      {/* Video Player */}
      <div className="mt-4 relative w-full aspect-video">
        {" "}
        {/* Set a height for the container */}
        <iframe
          className="absolute top-0 left-0 w-full h-full" // Use absolute positioning to fill the container
          src={selectedServer}
          allowFullScreen // Allow full screen
          title="Video Player"
        >
          Your browser does not support the video tag.
        </iframe>
      </div>

      {/* Video Servers */}
      <h3 className="mt-4 text-lg font-semibold">Available Servers:</h3>
      <div className="flex gap-2">
        {episode.videoServer.map((server, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg ${
              selectedServer === server
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setSelectedServer(server)} // Set the selected server
          >
            {`Server ${index + 1}`}
          </button>
        ))}
      </div>
    </>
  );
}
