"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            🔙 Back to Home
          </Link>

          {bookmarks.length > 0 && (
            <button
              onClick={clearAllBookmarks}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors"
            >
              Clear All Bookmarks
            </button>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-6">My Bookmarked Series</h1>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-indigo-500 transition-all group"
              >
                <Link
                  href={`/series/${bookmark.slug}`}
                  className="block relative"
                >
                  {bookmark.banner && (
                    <div className="w-full h-48 relative">
                      <Image
                        src={bookmark.banner}
                        alt={bookmark.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="absolute top-0 right-0 p-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        bookmark.status === "ongoing"
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {bookmark.status.charAt(0).toUpperCase() +
                        bookmark.status.slice(1)}
                    </span>
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-bold text-lg line-clamp-2">
                      <Link href={`/series/${bookmark.slug}`}>
                        {bookmark.title}
                      </Link>
                    </h2>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeBookmark(bookmark.id);
                      }}
                      className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove bookmark"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex justify-between mt-4">
                    <span className="text-sm text-gray-400">
                      {new Date(bookmark.addedAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/series/${bookmark.slug}`}
                      className="text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
