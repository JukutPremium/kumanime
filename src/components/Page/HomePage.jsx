"use client";

import { useRef } from "react";
import HeroSlider from "@/components/Layout/Slider";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import Image from "next/image";

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
    slug: `${process.env.NEXT_PUBLIC_BASE_URL}/series/${item.slug}`,
    primaryButtonText: "Watch Now",
  }));

  return (
    <>
      <HeroSlider sliderData={formattedSliderData} />

      {/* New Update */}
      <section className="h-full w-full">
        <div className="pt-12 sm:pt-24 flex flex-col gap-5 px-4 sm:px-24 bg-black">
          <div className="flex justify-between items-center px-2 sm:px-5 border-l-4 border-[#2FFF51]">
            <h2 className="text-white font-bold text-xl sm:text-2xl">
              New Update
            </h2>
            <Link
              href="/ongoing"
              className="text-black font-bold text-base sm:text-xl bg-[#2FFF51] py-1 sm:py-2 px-3 sm:px-4 rounded-full"
            >
              See All
            </Link>
          </div>
          <div className="relative">
            <button
              className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={() => scrollLeft(updatedRef)}
            >
              ◀
            </button>
            <div
              ref={updatedRef}
              className="w-full overflow-x-hidden flex gap-5 scroll-smooth"
            >
              {updatedSeries.map((seris, index) => (
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/series/${seris.slug}`}
                  key={index}
                  className="flex-shrink-0 w-48 sm:w-64"
                >
                  <Image
                    src={seris.banner}
                    width={800}
                    height={800}
                    alt="image"
                    className="aspect-[4/6] rounded-3xl"
                  />
                  <div className="py-3">
                    <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                      {seris.title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Uploaded : {formatDate(seris.updatedOn)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <button
              className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={() => scrollRight(updatedRef)}
            >
              ▶
            </button>
          </div>
        </div>
      </section>

      {/* Latest Completed */}
      <section className="h-full w-full">
        <div className="pt-12 sm:pt-24 flex flex-col gap-5 px-4 sm:px-24 bg-black">
          <div className="flex justify-between items-center px-2 sm:px-5 border-l-4 border-[#2FFF51]">
            <h2 className="text-white font-bold text-xl sm:text-2xl">
              Latest Completed
            </h2>
            <Link
              href="/completed"
              className="text-black font-bold text-base sm:text-xl bg-[#2FFF51] py-1 sm:py-2 px-3 sm:px-4 rounded-full"
            >
              See All
            </Link>
          </div>
          <div className="relative">
            <button
              className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={() => scrollLeft(completedRef)}
            >
              ◀
            </button>
            <div
              ref={completedRef}
              className="w-full overflow-x-hidden flex gap-4 scroll-smooth"
            >
              {completedSeries.map((seris, index) => (
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/series/${seris.slug}`}
                  key={index}
                  className="flex-shrink-0 w-48 sm:w-64"
                >
                  <Image
                    src={seris.banner}
                    width={800}
                    height={800}
                    alt="image"
                    className="aspect-[4/6] rounded-3xl"
                  />
                  <div className="py-3">
                    <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                      {seris.title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Uploaded : {formatDate(seris.updatedOn)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <button
              className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={() => scrollRight(completedRef)}
            >
              ▶
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
