import Link from "next/link";
import getSeriesSchedule from "@/fetch/getSeriesSchedule";

export default async function Schedule() {
  const { data } = await getSeriesSchedule();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Anime Schedule</h1>

      <div className="space-y-6">
        {data.map(({ day, data }) => (
          <div key={day}>
            <h2 className="text-2xl font-semibold text-blue-400">{day}</h2>

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
              <p className="text-gray-500 text-sm">No anime scheduled.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
