"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="h-full w-full bg-[#15202B] mt-20">
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-24 pt-12 sm:pt-24 space-y-8 sm:space-y-0">
        {/* Brand Info */}
        <div className="w-full sm:w-96 text-center sm:text-left">
          <h3 className="font-bold text-2xl sm:text-3xl text-white">
            Kum<span className="text-[#2FFF51]">anime</span>
          </h3>
          <p className="text-white text-sm sm:text-base mt-4">
            Tempat streaming anime tanpa iklan yang mengganggu. Nikmati series
            favoritmu hanya di Kumanime.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="w-full sm:w-96 text-center sm:text-right">
          <h3 className="font-bold text-2xl sm:text-3xl text-white">
            Navigation
          </h3>
          <ul className="text-white mt-4 space-y-2">
            <li>
              <Link
                href="/#"
                className="hover:text-[#2FFF51] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/animelist"
                className="hover:text-[#2FFF51] transition-colors"
              >
                Anime List
              </Link>
            </li>
            <li>
              <Link
                href="/watchlist"
                className="hover:text-[#2FFF51] transition-colors"
              >
                Watchlist
              </Link>
            </li>
            <li>
              <Link
                href="/ongoing"
                className="hover:text-[#2FFF51] transition-colors"
              >
                Ongoing
              </Link>
            </li>
            <li>
              <Link
                href="/schedule"
                className="hover:text-[#2FFF51] transition-colors"
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/completed"
                className="hover:text-[#2FFF51] transition-colors"
              >
                Completed
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-400 pb-8 sm:pb-14 px-4">
        <p className="text-sm sm:text-base">
          instinkedevelopment.offcl@gmail.com
        </p>
        <p className="text-sm sm:text-base mt-2">
          Copyright © 2025 Kumanime. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
