import Link from "next/link";
import { notFound } from "next/navigation";
import getSeriesBySlug from "@/fetch/getSeriesBySlug";
import handleCreateEpisode from "@/action/handleCreateEpisode";

export default async function CreateEpisode(req) {
  const params = await req.params;
  const searchParams = await req.searchParams; // Ambil query params
  const seriesSlug = params.series;
  const seriesData = await getSeriesBySlug(seriesSlug);

  if (!seriesData || seriesData.error) {
    return notFound();
  }

  const seriesId = seriesData.data.id;

  // Ambil message dan status dari query params
  const message = searchParams?.message || "";
  const alertStatus = searchParams?.status || "";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create New Episode</h1>
          <Link
            href={`/dashboard/series/${seriesSlug}`}
            className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            🔙 Back to Series Dashboard
          </Link>
        </div>

        {/* Form Create Episode */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-gray-400 mb-4">Series ID: {seriesId}</p>
          <form action={handleCreateEpisode} className="space-y-4">
            <input type="hidden" name="seriesId" value={seriesId} />
            <input type="hidden" name="seriesSlug" value={seriesSlug} />

            {/* Judul Episode */}
            <div>
              <label className="block text-gray-300">Episode Order:</label>
              <input
                type="text"
                name="order"
                required
                placeholder="Enter episode order"
                className="w-full px-4 py-2 bg-gray-700 rounded text-white"
              />
            </div>

            {/* URL Video */}
            <div>
              <label className="block text-gray-300">Video URL:</label>
              <input
                type="text"
                name="videoServer"
                required
                placeholder="Enter video URL"
                className="w-full px-4 py-2 bg-gray-700 rounded text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
            >
              Create Episode
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
