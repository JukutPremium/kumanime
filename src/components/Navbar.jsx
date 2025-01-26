"use client";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-Kblack p-4 text-white sticky top-0 z-50">
      <div className="mx-4 md:mx-20 flex justify-between items-center">
        <h1 className="font-bold text-3xl">
          Kum<span className="text-Kgreen">anime</span>
        </h1>
        {/* Dekstop */}
        <div className="hidden md:flex">
          <ul className="flex gap-4 font-semi-bold text-md items-center">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Anime List</Link>
            </li>
            <li>
              <Link href="#">Watchlist</Link>
            </li>
            <li>
              <Link href="#">Ongoing</Link>
            </li>
            <li>
              <Link href="#">Schedule</Link>
            </li>
            <li className="h-5 w-5">
              <button>
                <AiOutlineSearch className="size-5" />
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            <FaBars className="size-5" />
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} mt-4`}>
        <ul className="flex flex-col gap-4 font-semi-bold text-md items-center">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">Anime List</Link>
          </li>
          <li>
            <Link href="#">Watchlist</Link>
          </li>
          <li>
            <Link href="#">Ongoing</Link>
          </li>
          <li>
            <Link href="#">Schedule</Link>
          </li>
          <li>
            <button>Search</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
