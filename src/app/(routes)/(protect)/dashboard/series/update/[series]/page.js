import Link from "next/link";
import { notFound } from "next/navigation";
import getSeriesBySlug from "@/fetch/getSeriesBySlug";
import handleUpdateSeries from "@/action/handleUpdateSeries";

export default async function UpdateSeries(req) {
  const params = await req.params;
  const searchParams = await req.searchParams; // Ambil query params
  const seriesQuery = params.series;

  const series = await getSeriesBySlug(seriesQuery);
  if (series.error) return notFound();
  const seriesData = series.data;

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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Update Series</h1>
          <Link
            href="/dashboard"
            className="inline-block mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            🔙 Back to Dashboard
          </Link>
        </div>
        <form action={handleUpdateSeries} className="space-y-4">
          <input type="hidden" name="slug" value={seriesData.slug} />
          <input
            type="text"
            name="title"
            defaultValue={seriesData.title}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="banner"
            defaultValue={seriesData.banner}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <textarea
            name="synopsis"
            defaultValue={seriesData.synopsis}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <select
            name="status"
            defaultValue={seriesData.status}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="text"
            name="studio"
            defaultValue={seriesData.studio}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="season"
            defaultValue={seriesData.season}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="type"
            defaultValue={seriesData.type}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <select
            name="scheduleDay"
            defaultValue={seriesData.scheduleDay}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <input
            type="text"
            name="genre"
            defaultValue={seriesData?.genre?.join("; ") || ""}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="preview"
            defaultValue={seriesData.preview || ""}
            className="w-full px-4 py-2 bg-gray-800 rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="censor"
              defaultChecked={seriesData.censor}
              className="form-checkbox text-green-500"
            />
            <span>Censor</span>
          </label>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Update Series
          </button>
        </form>
      </div>
    </div>
  );
}
