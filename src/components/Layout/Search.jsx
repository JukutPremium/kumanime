"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";

export default function Search({ setIsSearchOpen }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[#141519] flex justify-center items-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsSearchOpen(false)}
          aria-label="Close Search"
          className="text-white text-4xl"
        >
          <HiOutlineXMark />
        </button>

        <input
          className="border-b-2 border-white bg-transparent focus:outline-none text-white w-96 h-10 text-2xl"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          autoFocus
        />

        <button
          onClick={handleSearch}
          aria-label="Search"
          className="text-white text-4xl"
        >
          <IoIosSearch />
        </button>
      </div>
    </div>
  );
}
