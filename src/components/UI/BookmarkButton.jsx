"use client";

import { useState, useEffect } from "react";

// Bookmark Button Client Component
export default function BookmarkButton({ seriesData }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if the series is already bookmarked on component mount
  useEffect(() => {
    setMounted(true);
    const checkBookmarkStatus = () => {
      const bookmarks = JSON.parse(
        localStorage.getItem("animeBookmarks") || "[]",
      );
      const isAlreadyBookmarked = bookmarks.some(
        (bookmark) => bookmark.id === seriesData.id,
      );
      setIsBookmarked(isAlreadyBookmarked);
    };

    checkBookmarkStatus();
  }, [seriesData.id]);

  // Toggle bookmark status
  const toggleBookmark = () => {
    // Get current bookmarks from localStorage
    const bookmarks = JSON.parse(
      localStorage.getItem("animeBookmarks") || "[]",
    );

    if (isBookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark.id !== seriesData.id,
      );
      localStorage.setItem("animeBookmarks", JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      // Add to bookmarks
      const newBookmark = {
        id: seriesData.id,
        slug: seriesData.slug,
        title: seriesData.title,
        banner: seriesData.banner,
        status: seriesData.status,
        addedAt: new Date().toISOString(),
      };

      const updatedBookmarks = [...bookmarks, newBookmark];
      localStorage.setItem("animeBookmarks", JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
    }
  };

  // Don't render anything during SSR to prevent hydration mismatches
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleBookmark}
      className={`flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-lg transition-colors ${
        isBookmarked
          ? "bg-yellow-600 hover:bg-yellow-700 text-white"
          : "bg-gray-700 hover:bg-gray-600 text-white"
      }`}
    >
      {isBookmarked ? (
        <>
          <span className="text-xl">⭐</span>
          <span>Bookmarked</span>
        </>
      ) : (
        <>
          <span className="text-xl">☆</span>
          <span>Add to Bookmarks</span>
        </>
      )}
    </button>
  );
}

// You'll need to create a new file for the Bookmarks page
// pages/bookmarks.js or app/bookmarks/page.js depending on your Next.js version
