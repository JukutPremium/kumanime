import Link from "next/link";
import { notFound } from "next/navigation";
import getSeriesBySlug from "@/fetch/getSeriesBySlug";

export default async function series(req) {
  const params = await req.params;
  const seriesSlug = params.series;
  const seriesData = await getSeriesBySlug(seriesSlug);

  if (!seriesData || seriesData.error) {
    return notFound();
  }

  const { title, studio, season, type, scheduleDay, genre, status, episodes } =
    seriesData.data;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-block mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          🔙 Back to Home
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-400">
          {studio} | {season} | {type}
        </p>
        <p className="text-gray-400">
          Status: {status} | Airs on: {scheduleDay}
        </p>
        <p className="text-gray-400">Genres: {genre.join(", ")}</p>

        {/* Episode List */}
        <h3 className="mt-6 text-lg font-semibold">All Episodes:</h3>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {episodes.map((ep) => (
            <Link
              key={ep.slug}
              href={`/episode/${ep.slug}`}
              className="bg-gray-700 visited:bg-fuchsia-600 hover:bg-gray-600 px-4 py-2 rounded-lg text-center"
            >
              Ep {ep.order}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
