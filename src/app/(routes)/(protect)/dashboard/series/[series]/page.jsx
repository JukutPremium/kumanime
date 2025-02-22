import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import getSeriesBySlug from "@/fetch/getSeriesBySlug";
import deleteEpisode from "@/action/deleteEpisode";

export default async function DashboardSeries(req) {
  const params = await req.params;
  const searchParams = await req.searchParams; // Ambil query params
  const seriesSlug = params.series;
  const seriesData = await getSeriesBySlug(seriesSlug);

  if (!seriesData || seriesData.error) {
    return notFound();
  }

  const { title, studio, season, type, scheduleDay, genre, status, episodes } =
    seriesData.data;

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

        {/* Back to Home */}
        <Link
          href="/dashboard"
          className="inline-block mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          🔙 Back to Dashboard
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

        {/* Episode List Table */}
        <div className="flex mt-10 justify-between items-center">
          <h3 className="text-lg font-semibold">All Episodes:</h3>
          <div>
            {/* Create New Episode Button */}
            <Link
              href={`/dashboard/episode/create/${seriesSlug}`}
              className="px-6 mr-2 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
            >
              + Create New Episode
            </Link>
            <Link
              href={`/dashboard/series/${seriesSlug}`}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
            >
              reload
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-gray-800 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Episode</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((ep) => (
                <tr key={ep.slug} className="border-t border-gray-700">
                  <td className="px-4 py-2">Ep {ep.order}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <Link
                      href={`/dashboard/episode/${ep.slug}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/episode/update/${ep.slug}`}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      Edit
                    </Link>

                    {/* Delete Episode Form */}
                    <form
                      action={async (formData) => {
                        "use server";
                        const result = await deleteEpisode(formData);

                        if (!result.success) {
                          redirect(
                            `/dashboard/series/${seriesSlug}?message=${result.message}&status=error`,
                          );
                        } else {
                          redirect(
                            `/dashboard/series/${seriesSlug}?message=Episode ${result.deletedData.order} has been deleted successfully&status=success`,
                          );
                        }
                      }}
                      className="inline-block"
                    >
                      <input name="slug" value={ep.slug} type="hidden" />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
