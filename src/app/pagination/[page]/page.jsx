import Link from "next/link";

export default async function Page({ params }) {
  const { page: pageParams } = await params;

  const page = parseInt(pageParams) || 1;
  const limit = 10; // Bisa juga diambil dari query jika diperlukan

  console.log(page);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Page: {page}</h1>
      <h2 className="text-lg text-gray-600 mt-2">Limit: {limit}</h2>

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
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
