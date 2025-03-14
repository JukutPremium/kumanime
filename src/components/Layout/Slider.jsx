"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";

const HeroSlider = ({ sliderData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (sliderData.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
    }, 10000);

    return () => clearInterval(slideInterval);
  }, [sliderData.length]);

  return (
    <section className="relative aspect-[4/3] md:aspect-video lg:aspect-[16/5] w-full overflow-hidden">
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`absolute h-full w-full inset-0 transition-opacity duration-700 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute h-full w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
            }}
          />

          <div className="absolute right-0 left-0 top-0 bottom-0 bg-gradient-to-t from-Kblack from-15% via-Kblack/80 via-40% to-transparent" />

          {/* Content */}

          <div className="relative z-10 h-full w-full flex items-end justify-center">
            <div className="p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
              <div className="border-l-4 border-[#2FFF51] py-2">
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold pl-3 sm:pl-5">
                  {slide.title}
                </h1>

                <p className="text-white pl-4 sm:pl-6 text-xs sm:text-sm md:text-base lg:text-lg line-clamp-3 w-full sm:w-2/3">
                  {slide.description}
                </p>
              </div>

              <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Link
                  href={slide.slug}
                  className="bg-[#2FFF51] px-4 sm:px-6 py-2 rounded-full flex items-center justify-center space-x-2 text-black font-bold text-xs sm:text-sm md:text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>{slide.primaryButtonText}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}

      <div className="absolute bottom-0 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-[#2FFF51]" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}

      <button
        onClick={() =>
          setCurrentSlide(
            (prevSlide) =>
              (prevSlide - 1 + sliderData.length) % sliderData.length,
          )
        }
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 sm:p-2"
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() =>
          setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length)
        }
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 sm:p-2"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default HeroSlider;
