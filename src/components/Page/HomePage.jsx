"use client";

import { useRef } from "react";
import HeroSlider from "@/components/Layout/Slider";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import Image from "next/image";

const Section = ({
  title,
  link,
  series,
  scrollRef,
  scrollLeft,
  scrollRight,
}) => (
  <section className="h-full w-full">
    <div className="pt-12 sm:pt-24 flex flex-col gap-5 px-4 sm:px-24 bg-black">
      <div className="flex justify-between items-center px-2 sm:px-5 border-l-4 border-[#2FFF51]">
        <h2 className="text-white font-bold text-xl sm:text-2xl">{title}</h2>
        <Link
          href={link}
          className="text-black font-bold text-base sm:text-xl bg-[#2FFF51] py-1 sm:py-2 px-3 sm:px-4 rounded-full"
        >
          See All
        </Link>
      </div>
      <div className="relative">
        {/* Tombol navigasi kiri */}
        <button
          className="absolute hidden sm:block sm:-left-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 sm:p-3 rounded-full z-10"
          onClick={() => scrollLeft(scrollRef)}
        >
          ◀
        </button>
        {/* Container Scrollable */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-hidden flex gap-5 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        >
          {series.map((seris, index) => (
            <Link
              href={`/series/${seris.slug}`}
              key={index}
              className="flex-shrink-0 relative w-40 sm:w-48 md:w-56 lg:w-64 snap-center"
            >
              <Image
                src={seris.banner}
                width={800}
                height={800}
                alt="image"
                className="aspect-[3/4] rounded-2xl object-cover"
              />
              <div className="pt-4 pb-1">
                {/* Status & Genre Wrapper */}
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="flex gap-1 flex-wrap">
                    {/* Status */}
                    <span
                      className={`inline-block px-2 py-1 rounded-2xl text-xs font-bold ${seris.status === "ongoing"
                          ? "bg-orange-600"
                          : "bg-purple-500"
                        }`}
                    >
                      {seris.status.charAt(0).toUpperCase() +
                        seris.status.slice(1)}
                    </span>

                    {/* Genre */}
                    {seris.genre.map((genre, idx) => {
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
                          className={`inline-block px-2 py-1 rounded-2xl text-xs font-bold ${bgColor}`}
                        >
                          {genre}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="">
                <p className=" text-white text-base sm:text-lg md:text-xl font-semibold">
                  {seris.title}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Uploaded: {formatDate(seris.updatedOn)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/* Tombol navigasi kanan */}
        <button
          className="absolute hidden sm:block sm:-right-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 sm:p-3 rounded-full z-10"
          onClick={() => scrollRight(scrollRef)}
        >
          ▶
        </button>
      </div>
    </div>
  </section>
);

const HomePage = ({ updatedSeries, completedSeries }) => {
  const updatedRef = useRef(null);
  const completedRef = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollLeft -= 300;
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollLeft += 300;
  };

  const formattedSliderData = updatedSeries.map((item) => ({
    backgroundImage: item.banner,
    title: item.title,
    description: item.synopsis,
    slug: `/series/${item.slug}`,
    primaryButtonText: "Watch Now",
  }));

  return (
    <>
      <HeroSlider sliderData={formattedSliderData} />

      {/* New Update */}
      <Section
        title="New Update"
        link="/ongoing"
        series={updatedSeries}
        scrollRef={updatedRef}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
      />

      {/* Latest Completed */}
      <Section
        title="Latest Completed"
        link="/completed"
        series={completedSeries}
        scrollRef={completedRef}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
      />
    </>
  );
};

export default HomePage;
