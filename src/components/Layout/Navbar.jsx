"use client";

import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Search from "@/components/Layout/Search";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {isSearchOpen && (
        <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      )}
      <nav className="bg-Kblack p-4 text-white shadow-2xl shadow-Kblack sticky top-0 z-50">
        <div className="mx-4 md:mx-20 flex justify-between shadow-2xl items-center">
          <Link href="/" className="font-bold text-3xl">
            Kum<span className="text-Kgreen">anime</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <ul className="flex gap-4 font-semi-bold text-md items-center">
              <li>
                <Link href="/#">Home</Link>
              </li>
              <li>
                <Link href="/animelist">Anime List</Link>
              </li>
              <li>
                <Link href="/watchlist">Watchlist</Link>
              </li>
              <li>
                <Link href="/ongoing">Ongoing</Link>
              </li>
              <li>
                <Link href="/schedule">Schedule</Link>
              </li>
              <li>
                <Link href="/completed">Completed</Link>
              </li>
              <li className="h-5 w-5">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                  <AiOutlineSearch className="size-5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              <FaBars className="size-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col gap-4 font-semi-bold text-md items-center">
              <li>
                <Link href="/#">Home</Link>
              </li>
              <li>
                <Link href="/animelist">Anime List</Link>
              </li>
              <li>
                <Link href="/watchlist">Watchlist</Link>
              </li>
              <li>
                <Link href="/ongoing">Ongoing</Link>
              </li>
              <li>
                <Link href="/schedule">Schedule</Link>
              </li>
              <li>
                <Link href="/completed">Completed</Link>
              </li>
              <li className="h-5 w-5">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                  <AiOutlineSearch className="size-5" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
