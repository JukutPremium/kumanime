import Link from "next/link";

async function getSeries(search, page, limit) {
  const queryParam = search && search !== "kosong" ? `&search=${search}&` : "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?page=${page}&limit=${limit + queryParam}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_SECRET}`,
      },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Search(params) {
  const searchParams = await params.searchParams;
  const search = searchParams.query || "";
  const page = parseInt(searchParams.page) || 1;
  const limit = 10; // Bisa diubah sesuai kebutuhan

  const { data, total } = await getSeries(search, page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold">Search: {search || "All"}</h1>
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
          href={`/search?query=${search}&page=${page - 1}`}
          className={`px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 ${page <= 1 ? "pointer-events-none opacity-50" : ""
            }`}
        >
          Previous
        </Link>

        {/* Tombol Next */}
        <Link
          href={`/search?query=${search}&page=${page + 1}`}
          className={`px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 ${page >= totalPages ? "pointer-events-none opacity-50" : ""
            }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
