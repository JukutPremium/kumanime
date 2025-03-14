"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import formatDate from "@/utils/formatDate";

export default function WatchlistPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load bookmarks from localStorage
    const loadBookmarks = () => {
      const storedBookmarks = JSON.parse(
        localStorage.getItem("animeBookmarks") || "[]",
      );
      // Sort by most recently added
      storedBookmarks.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      setBookmarks(storedBookmarks);
      setIsLoading(false);
    };

    loadBookmarks();
  }, []);

  const removeBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    localStorage.setItem("animeBookmarks", JSON.stringify(updatedBookmarks));
    setBookmarks(updatedBookmarks);
  };

  const clearAllBookmarks = () => {
    if (confirm("Are you sure you want to remove all bookmarks?")) {
      localStorage.removeItem("animeBookmarks");
      setBookmarks([]);
    }
  };

  return (
    <>
      <header className="mt-20 flex justify-between container mx-auto px-[7%]">
        <h1 className="font-bold text-[32px]  border-l-4 border-Kgreen pl-4 text-Kgreen">
          Watchlist <span className="text-white">Series</span>
        </h1>
        {bookmarks.length > 0 && (
          <button
            onClick={clearAllBookmarks}
            className="px-4 rounded-3xl text-base font-bold bg-red-700 hover:bg-red-600 transition-colors"
          >
            Clear All Bookmarks
          </button>
        )}
      </header>

      <main className="container px-[7%] flex flex-wrap gap-6 py-8 mx-auto">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-xl mb-4">
              You have not bookmarked any series yet.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              Explore Series
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {bookmarks.map((seris, index) => (
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/series/${seris.slug}`}
                key={index}
                className="relative w-40 sm:w-48 md:w-56 lg:w-64 snap-center rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={seris.banner}
                  width={800}
                  height={800}
                  alt="image"
                  className="aspect-[4/6] object-cover rounded-3xl"
                />
                <div className="p-4 rounded-3xl">
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    {/* Status */}
                    <span
                      className={`px-3 py-1 rounded-3xl text-xs font-bold text-white ${
                        seris.status === "ongoing"
                          ? "bg-orange-600"
                          : "bg-purple-500"
                      }`}
                    >
                      {seris.status.charAt(0).toUpperCase() +
                        seris.status.slice(1)}
                    </span>

                    {/* Genre */}
                    {seris?.genre.map((genre, idx) => {
                      const pastelColors = [
                        "bg-red-200 text-red-800",
                        "bg-blue-200 text-blue-800",
                        "bg-green-200 text-green-800",
                        "bg-yellow-200 text-yellow-800",
                        "bg-purple-200 text-purple-800",
                        "bg-pink-200 text-pink-800",
                        "bg-indigo-200 text-indigo-800",
                        "bg-teal-200 text-teal-800",
                      ];
                      const bgColor = pastelColors[idx % pastelColors.length];
                      return (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded-3xl text-xs font-bold ${bgColor}`}
                        >
                          {genre}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-white text-base sm:text-lg md:text-xl font-semibold">
                    {seris.title}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Uploaded: {formatDate(seris.updatedOn)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
