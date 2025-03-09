import Link from "next/link";
import getSeriesSearch from "@/fetch/getSeriesSearch";

export const metadata = {
  title: "Search Anime",
};

export default async function Search(req) {
  const searchParams = await req.searchParams;
  const search = searchParams.query;
  const page = parseInt(searchParams.page) || 1;
  const limit = 10; // Bisa diubah sesuai kebutuhan

  const { data, total } = await getSeriesSearch(search, page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold">Search: {search || "All"}</h1>

      {/* Search Form */}
      <form action="/search" method="GET" className="mt-4 flex gap-2">
        <input
          type="text"
          name="query"
          defaultValue={search}
          className="px-4 py-2 bg-gray-800 rounded-lg text-white"
          placeholder="Search series..."
        />
        <input type="hidden" name="page" value="1" />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Search
        </button>
        <Link
          href="/search"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          All
        </Link>
      </form>

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
        {page > 1 && (
          <Link
            href={`/search?query=${search}&page=${page - 1}`}
            className="px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
          >
            Previous
          </Link>
        )}

        {/* Tombol Next */}
        {page < totalPages && (
          <Link
            href={`/search?query=${search}&page=${page + 1}`}
            className="px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
