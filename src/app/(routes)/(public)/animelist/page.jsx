import Link from "next/link";
import getSeriesAnimeList from "@/fetch/getSeriesAnimeList";

export const metadata = {
  title: "Anime List",
};

export default async function AnimeList() {
  const { data } = await getSeriesAnimeList();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Anime List</h1>

      {/* Navigasi Huruf */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {data.map(({ name }) => (
          <a
            key={name}
            href={`#${name}`}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {name.toUpperCase()}
          </a>
        ))}
      </div>

      {/* List Anime */}
      <div className="space-y-8">
        {data.map(({ name, data }) => (
          <div key={name} id={name} className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-blue-400">
              {name.toUpperCase()}
            </h2>

            {data.length > 0 ? (
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((anime) => (
                  <Link
                    key={anime.id}
                    href={`/series/${anime.slug}`}
                    className="block bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
                  >
                    <h3 className="text-xl font-medium">{anime.title}</h3>
                    <p className="text-gray-400 text-sm">{anime.studio}</p>
                    <p className="text-gray-400 text-xs">
                      {anime.type} • {anime.season}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No anime available.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
