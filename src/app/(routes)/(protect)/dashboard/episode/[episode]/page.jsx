import Link from "next/link";
import { notFound } from "next/navigation";
import getEpisodeBySlug from "@/fetch/getEpisodeBySlug";

export default async function DashboardEpisode(req) {
  const params = await req.params;
  const searchParams = await req.searchParams; // Ambil query params
  const episodeSlug = params.episode;
  const episodeData = await getEpisodeBySlug(episodeSlug);

  if (!episodeData || episodeData.error) {
    return notFound();
  }

  const { episode, previous, next, allEpisodes } = episodeData.data;

  // Ambil message dan status dari query params
  const message = searchParams?.message || "";
  const alertStatus = searchParams?.status || "";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Notifikasi Status */}
        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded-lg ${
              alertStatus === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Back to Series */}
        <Link
          href={`/dashboard/series/${episode.series.slug}`}
          className="inline-block mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          🔙 Back to {episode.series.title} Dashboard
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">
          {episode.series.title} - Episode {episode.order}
        </h1>
        <p className="text-gray-400">
          Studio: {episode.series.studio} | {episode.series.season} |{" "}
          {episode.series.type}
        </p>
        <p className="text-gray-400">
          Released on: {new Date(episode.releasedOn).toLocaleDateString()}
        </p>

        {/* Video Servers */}
        <h3 className="mt-4 text-lg font-semibold">Available Servers:</h3>
        <div className="flex gap-2">
          {episode.videoServer.map((server, index) => (
            <button key={index} className="bg-blue-600 px-4 py-2 rounded-lg">
              {server}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {previous ? (
            <Link
              href={`/dashboard/episode/${previous.slug}`}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
            >
              ⬅️ Previous
            </Link>
          ) : (
            <span className="bg-gray-800 px-4 py-2 rounded-lg opacity-50">
              ⬅️ Previous
            </span>
          )}

          {next ? (
            <Link
              href={`/dashboard/episode/${next.slug}`}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
            >
              Next ➡️
            </Link>
          ) : (
            <span className="bg-gray-800 px-4 py-2 rounded-lg opacity-50">
              Next ➡️
            </span>
          )}
        </div>

        {/* Episode List */}
        <h3 className="mt-6 text-lg font-semibold">All Episodes Dashboard:</h3>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {allEpisodes.map((ep) => (
            <Link
              key={ep.slug}
              href={`/dashboard/episode/${ep.slug}`}
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
