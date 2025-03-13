"use client";

import { useState } from "react";
import Link from "next/link";

export default function SelectedServer({ episode, next, previous }) {
  const [selectedServer, setSelectedServer] = useState(episode.videoServer[0]);

  return (
    <>
      {/* Video Player */}
      <div className="mt-4 bg-gray-200 rounded-2xl overview-hidden relative w-full aspect-video">
        <iframe
          className="absolute bg-gray-200 rounded-2xl  top-0 left-0 w-full h-full"
          src={selectedServer}
          allowFullScreen
          title="Video Player"
        >
          Your browser does not support the video tag.
        </iframe>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 gap-2 items-center">
        {previous ? (
          <Link
            href={`/episode/${previous.slug}`}
            className="bg-Kgreen hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Previous
          </Link>
        ) : (
          <span className="bg-gray-800 text-white px-4 py-2 rounded-lg">
            Previous
          </span>
        )}

        {/* Video Servers Dropdown */}
        <select
          className="rounded-lg bg-gray-700 px-4 h-10 w-full text-white"
          onChange={(e) => setSelectedServer(e.target.value)}
          value={selectedServer}
        >
          {episode.videoServer.map((server, index) => (
            <option key={index} value={server}>
              {`Server ${index + 1}`}
            </option>
          ))}
        </select>

        {next ? (
          <Link
            href={`/episode/${next.slug}`}
            className="bg-Kgreen hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Next
          </Link>
        ) : (
          <span className="bg-gray-800 text-white px-4 py-2 rounded-lg">
            Next
          </span>
        )}
      </div>
    </>
  );
}
