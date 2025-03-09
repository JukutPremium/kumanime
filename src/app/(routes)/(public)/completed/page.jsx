import Link from "next/link";
import getSeriesCompleted from "@/fetch/getSeriesCompleted";

export const metadata = {
  title: "Completed Anime",
};

export default async function Ongoing(req) {
  const searchParams = await req.searchParams;
  const page = parseInt(searchParams.page) || 1;
  const limit = 1; // Bisa diubah sesuai kebutuhan

  const { data, total } = await getSeriesCompleted(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold">Completed Series</h1>
      <h2 className="text-lg mt-2">Page: {page}</h2>

      {/* List Data */}
      <ul className="mt-4 space-y-2">
        {data.map((item) => (
          <li key={item.id} className="p-4 bg-gray-800 shadow-md rounded-lg">
            {item.title}
          </li>
        ))}
      </ul>

      {/* Tombol Navigasi */}
      <div className="flex gap-4 mt-6">
        {/* Tombol Previous */}
        <Link
          href={`/ongoing?page=${page - 1}`}
          className={`px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 ${
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Previous
        </Link>

        {/* Tombol Next */}
        <Link
          href={`/ongoing?page=${page + 1}`}
          className={`px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 ${
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
