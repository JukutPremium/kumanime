import Link from "next/link";

async function getSeries(page, limit) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/series?page=${page}&limit=${limit}`,
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

export default async function Page({ params }) {
  const page = parseInt(params.page) || 1;
  const limit = 1; // Bisa diubah sesuai kebutuhan

  const { data, total } = await getSeries(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Page: {page}</h1>
      <h2 className="text-lg text-gray-600 mt-2">Limit: {limit}</h2>

      {/* List Data */}
      <ul className="mt-4 space-y-2">
        {data.map((item) => (
          <li key={item.id} className="p-4 bg-white shadow-md rounded-lg">
            {item.title}
          </li>
        ))}
      </ul>

      {/* Tombol Navigasi */}
      <div className="flex gap-4 mt-6">
        {/* Tombol Previous */}
        <Link
          href={`/pagination/${page - 1}`}
          className={`px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 ${
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Previous
        </Link>

        {/* Tombol Next */}
        <Link
          href={`/pagination/${page + 1}`}
          className={`px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 ${
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
