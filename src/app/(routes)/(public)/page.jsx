import getSeries from "@/fetch/getSeries";
import Link from "next/link";
import Image from "next/image"; // Import Image from next/image

export default async function Home() {
  const { data } = await getSeries();

  // Filter series berdasarkan status
  const updatedSeries = data;
  const completedSeries = data.filter((anime) => anime.status === "completed");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Slider Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="text-3xl font-bold">Welcome to Anime List</h1>
        </div>
        <Image
          src={data[0]?.banner || "/default-banner.jpg"}
          alt="Featured Anime"
          layout="fill" // Use layout fill for responsive image
          objectFit="cover" // Cover the entire area
          className="rounded-lg"
        />
      </div>

      {/* Updated Series */}
      <section className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-400">Updated Series</h2>
          <Link
            href="/search"
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {updatedSeries.map((anime) => (
            <Link
              key={anime.id}
              href={`/series/${anime.slug}`}
              className="block bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition transform hover:scale-105"
            >
              <Image
                src={anime.banner || "/default-banner.jpg"} // Use anime banner or default image
                alt={anime.title}
                width={300} // Set a width for the image
                height={450} // Set a height for the image
                className="w-full h-48 object-cover" // Ensure the image covers the area
              />
              <div className="p-4">
                <h3 className="text-xl font-medium">{anime.title}</h3>
                <p className="text-gray-400 text-sm">{anime.studio}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Completed Series */}
      <section className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-400">
            Completed Series
          </h2>
          <Link
            href="/completed"
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {completedSeries.map((anime) => (
            <Link
              key={anime.id}
              href={`/series/${anime.slug}`}
              className="block bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition transform hover:scale-105"
            >
              <Image
                src={anime.banner || "/default-banner.jpg"} // Use anime banner or default image
                alt={anime.title}
                width={300} // Set a width for the image
                height={450} // Set a height for the image
                className="w-full h-48 object-cover" // Ensure the image covers the area
              />
              <div className="p-4">
                <h3 className="text-xl font-medium">{anime.title}</h3>
                <p className="text-gray-400 text-sm">{anime.studio}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
