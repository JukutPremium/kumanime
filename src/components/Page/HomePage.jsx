import HeroSlider from "@/components/Layout/Slider";

import Link from "next/link";
import Image from "next/image";

const HomePage = ({ updatedSeries, completedSeries }) => {
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
        <div className="pt-12 sm:pt-24 px-4 sm:px-24 bg-black">
          <div className="flex flex-col sm:flex-row justify-between items-center px-2 sm:px-5 border-l-4 border-[#2FFF51]">
            <h2 className="text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-0">
              New Update
            </h2>
            <button className="text-black font-bold text-base sm:text-xl bg-[#2FFF51] py-1 sm:py-2 px-3 sm:px-4 rounded-full">
              See All
            </button>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="py-5 flex gap-4 min-w-[1000px] sm:min-w-full">
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Completed */}
      <section className="h-full w-full">
        <div className="py-12 sm:py-24 px-4 sm:px-24 bg-black">
          <div className="flex flex-col sm:flex-row justify-between items-center px-2 sm:px-5 border-l-4 border-[#2FFF51]">
            <h2 className="text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-0">
              Latest Completed
            </h2>
            <button className="text-black font-bold text-base sm:text-xl bg-[#2FFF51] py-1 sm:py-2 px-3 sm:px-4 rounded-full">
              See All
            </button>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="py-5 flex gap-4 min-w-[1000px] sm:min-w-full">
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-48 sm:w-64">
                <Image
                  src="/banner.jpg"
                  width={800}
                  height={800}
                  alt="image"
                  className="rounded-3xl"
                ></Image>
                <div className="py-3">
                  <p className="pt-2 font-semibold">
                    <span className="py-1 text-black px-3 bg-[#2FFF51] rounded-full text-xs">
                      ongoing
                    </span>
                    <span className="py-1 text-white px-3 bg-[#512FFF] rounded-full text-xs ml-2">
                      new
                    </span>
                  </p>
                  <p className="pt-2 text-white text-xl sm:text-2xl font-semibold">
                    DAN DAN DAN DAN
                  </p>
                  <p className="text-gray-400 text-sm">
                    Uploaded : Dec 13, 06:27
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
