import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import getSeriesSearch from "@/fetch/getSeriesSearch";

export default async function Dashboard(req) {
  const session = await auth();

  if (!session?.user) return null; // Jika tidak ada user, tidak tampilkan apa pun

  // Mengambil query pencarian dan halaman
  const searchParams = await req.searchParams;
  const search = searchParams?.query || "";
  const page = parseInt(searchParams?.page) || 1;
  const limit = 10;

  // Mengambil data berdasarkan pencarian
  const { data, total } = await getSeriesSearch(search, page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      {/* User Info */}
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <Image
          src={session.user.image}
          alt={session.user.name}
          width="100"
          height="100"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-2xl font-bold mt-4">{session.user.name}</h2>
        <p className="text-gray-400">{session.user.email}</p>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-lg mt-8">
        <h1 className="text-3xl font-bold text-center">Search Anime</h1>
        <form action="/dashboard" method="GET" className="mt-4 flex gap-2">
          <input
            type="text"
            name="query"
            defaultValue={search}
            className="px-4 py-2 w-full bg-gray-800 rounded-lg text-white"
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
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            All
          </Link>
        </form>
      </div>

      {/* Hasil Pencarian */}
      <div className="w-full max-w-2xl mt-6">
        <h2 className="text-xl font-bold text-center">
          Results for: {search || "All"}
        </h2>
        <ul className="mt-4 space-y-2">
          {data.map((item) => (
            <li key={item.id} className="p-4 bg-gray-800 shadow-md rounded-lg">
              {item.title}
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          {page > 1 && (
            <Link
              href={`/dashboard?query=${search}&page=${page - 1}`}
              className="px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
            >
              Previous
            </Link>
          )}

          {page < totalPages && (
            <Link
              href={`/dashboard?query=${search}&page=${page + 1}`}
              className="px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
