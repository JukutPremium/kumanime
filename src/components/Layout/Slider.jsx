"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Slider data - replace with your actual content
const sliderData = [
  {
    backgroundImage: '/banner.jpg',
    title: 'DAN DAN DAN DAN',
    description: 'Momo\'s childhood friend and first love, Jiji (Enjoji Jin), comes to Seiko for help because he is disturbed by strange events in his new house. Okarun, who just found out that Jiji is Momo\'s first love, can\'t hide her anxiety and tries to get away from Momo. At that moment, a human body model appears and runs with all her might in front of Okarun.',
    primaryButtonText: 'Watch Now',
    secondaryButtonText: 'Add To Watch List'
  },
  {
    backgroundImage: '/banner1.png',
    title: 'Kusuriya no Hitorigoto 2nd Season',
    description: 'Second season of Kusuriya no Hitorigoto.',
    primaryButtonText: 'Watch Now',
    secondaryButtonText: 'Add To Watch List'
  }
  
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Automatic sliding every 5 seconds
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % sliderData.length
      );
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval);
  }, []);

  // Manual navigation dots
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
      {sliderData.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat brightness-50"
            style={{ 
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundPosition: 'top'
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 h-full w-full md:w-[900px] flex items-end justify-center">
            <div className='p-4 sm:p-12 md:p-24 w-full'>
              <div className='border-l-4 border-[#2FFF51] py-2'>
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pl-3 sm:pl-5">
                  {slide.title}
                </h1>
                <p className="text-white pl-4 sm:pl-6 text-sm sm:text-base lg:text-lg">
                  {slide.description}
                </p>
              </div>
              <div className='pt-4 sm:pt-8 flex flex-col sm:flex-row gap-4'>
                <button className="bg-[#2FFF51] px-6 sm:px-10 py-2 sm:py-3 rounded-full flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='font-bold text-sm sm:text-base'>{slide.primaryButtonText}</span>
                </button>
                <button className="border-4 border-[#2FFF51] px-6 sm:px-10 py-2 sm:py-3 rounded-full flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 text-[#2FFF51]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='text-[#2FFF51] font-bold text-sm sm:text-base'>{slide.secondaryButtonText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 w-2 rounded-full ${
              currentSlide === index ? 'bg-[#2FFF51]' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      {/* Optional: Add left/right navigation arrows */}
      <button 
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + sliderData.length) % sliderData.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
    
  );
};

export default HeroSlider;