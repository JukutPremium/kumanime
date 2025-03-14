import Link from "next/link";
import Image from "next/image";
import formatDate from "@/utils/formatDate";

export default function AnimelistPage({ data }) {
  return (
    <>
      {/* Header Section */}
      <header className="mt-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl border-l-4 border-Kgreen pl-4 text-Kgreen">
          Anime<span className="text-white">list</span>
        </h1>
        <div className="flex flex-wrap justify-center font-bold text-lg sm:text-xl lg:text-2xl gap-2  pt-12">
          {data.map(({ name: day }) => (
            <Link
              href={`#${day}`}
              key={day}
              className="py-2 px-4 bg-gray-800 rounded-lg transition duration-300 text-white hover:text-green-500"
            >
              {day}
            </Link>
          ))}
        </div>
      </header>

      {/* Main Section */}
      <main className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
        {data.map(({ name: day, data: seriesData }) => (
          <div
            key={day}
            id={day}
            className="target:bg-green-400 scroll-mt-20 w-full py-2"
          >
            <div className="flex justify-between w-full items-center gap-4 mb-4">
              <h2 className="py-2 px-4 bg-gray-800 rounded-lg transition duration-300 text-white hover:text-green-500 text-xl sm:text-2xl mt-3 font-semibold">
                {day}
              </h2>
              <Link
                className=" transition duration-300 text-white hover:text-green-500 text-xl sm:text-2xl mt-3 font-semibold"
                href="#"
              >
                Back to Top
              </Link>
            </div>

            {seriesData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {seriesData.map((series, index) => (
                  <Link
                    href={`/series/${series.slug}`}
                    key={index}
                    className="relative snap-center rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    {/* Image */}
                    <Image
                      src={series?.banner || "/banner.jpg"}
                      width={800}
                      height={800}
                      alt="image"
                      className="aspect-[4/6] text-center object-cover rounded-3xl"
                    />

                    {/* Content */}
                    <div className="p-4 rounded-3xl ">
                      <div className="flex flex-wrap gap-2 items-center mb-2">
                        {/* Status */}
                        <span
                          className={`px-3 py-1 rounded-3xl text-xs font-bold text-white ${
                            series.status === "ongoing"
                              ? "bg-orange-600"
                              : "bg-purple-500"
                          }`}
                        >
                          {series.status.charAt(0).toUpperCase() +
                            series.status.slice(1)}
                        </span>

                        {/* Genre */}
                        {series.genre.map((genre, idx) => {
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
                          const bgColor =
                            pastelColors[idx % pastelColors.length];
                          return (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded-3xl text-xs font-bold ${bgColor}`}
                            >
                              {genre}
                            </span>
                          );
                        })}
                      </div>
                      <p className="text-white text-base sm:text-lg md:text-xl font-semibold">
                        {series.title}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Uploaded: {formatDate(series.updatedOn)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No anime scheduled.</p>
            )}
          </div>
        ))}
      </main>
    </>
  );
}
