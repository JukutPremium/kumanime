import Link from "next/link";
import Image from "next/image";
import formatDate from "@/utils/formatDate";

export default function OngoingPage({ data, total, totalPages, page }) {
  return (
    <>
      <header className="mt-20 container mx-auto px-[7%]">
        <h1 className="font-bold text-[32px]  border-l-4 border-Kgreen pl-4 text-Kgreen">
          Ongoing <span className="text-white">Series</span>
        </h1>
      </header>

      <main className="container px-[7%] flex flex-wrap gap-6 py-8 mx-auto">
        {data.map((seris, index) => (
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/series/${seris.slug}`}
            key={index}
            className="relative w-40 sm:w-48 md:w-56 lg:w-64 snap-center rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={seris.banner}
              width={800}
              height={800}
              alt="image"
              className="aspect-[4/6] object-cover rounded-3xl"
            />
            <div className="p-4 rounded-3xl">
              <div className="flex flex-wrap gap-2 items-center mb-2">
                {/* Status */}
                <span
                  className={`px-3 py-1 rounded-3xl text-xs font-bold text-white ${
                    seris.status === "ongoing"
                      ? "bg-orange-600"
                      : "bg-purple-500"
                  }`}
                >
                  {seris.status.charAt(0).toUpperCase() + seris.status.slice(1)}
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
                      className={`px-2 py-1 rounded-3xl text-xs font-bold ${bgColor}`}
                    >
                      {genre}
                    </span>
                  );
                })}
              </div>
              <p className="text-white text-base sm:text-lg md:text-xl font-semibold">
                {seris.title}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Uploaded: {formatDate(seris.updatedOn)}
              </p>
            </div>
          </Link>
        ))}
      </main>

      {/* Tombol Navigasi */}
      <section className="container flex justify-center gap-4 mb-20 mx-auto">
        {/* Tombol Previous */}
        <Link
          href={`/ongoing?page=${page - 1}`}
          className={`px-6 py-3 bg-Kgreen text-white rounded-3xl shadow-lg hover:bg-green-800 transition-all duration-300 ${
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Previous
        </Link>

        {/* Tombol Next */}
        <Link
          href={`/ongoing?page=${page + 1}`}
          className={`px-6 py-3 bg-Kgreen text-white rounded-3xl shadow-lg hover:bg-green-800 transition-all duration-300 ${
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </section>
    </>
  );
}
