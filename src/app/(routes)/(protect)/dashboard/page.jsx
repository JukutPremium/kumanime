import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import getSeriesSearch from "@/fetch/getSeriesSearch";
import deleteSeries from "@/action/deleteSeries";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard(req) {
  const session = await auth();
  if (!session?.user) return null;

  const searchParams = await req.searchParams;
  const search = searchParams?.query || "";
  const page = parseInt(searchParams?.page) || 1;
  const message = searchParams?.message || "";
  const status = searchParams?.status || "";
  const limit = 10;

  const { data, total } = await getSeriesSearch(search, page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      {message && (
        <div
          className={`w-full max-w-2xl text-center p-4 rounded-lg mb-4 ${
            status === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {message}
        </div>
      )}

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

      <div className="w-full max-w-2xl mt-6 text-right">
        <Link
          href="/dashboard/series/create"
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          + Create New Series
        </Link>
      </div>

      <div className="w-full max-w-2xl mt-6">
        <h2 className="text-xl font-bold text-center">Anime Series</h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-gray-800 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <Link
                      href={`/dashboard/series/${item.slug}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/series/update/${item.slug}`}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      Edit
                    </Link>
                    <form
                      action={async (formData) => {
                        "use server";
                        const result = await deleteSeries(formData);

                        if (!result.success) {
                          redirect(
                            `/dashboard?message=${result.message}&status=error`,
                          );
                        } else {
                          const deletedDate = new Date();
                          const formattedDate = `${deletedDate.toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            },
                          )}`;
                          const formattedMessage = encodeURIComponent(
                            `✅ ${result.deletedData.title} is ${result.message} on ${formattedDate}`,
                          );
                          redirect(
                            `/dashboard?message=${formattedMessage}&status=success`,
                          );
                        }
                      }}
                      className="inline-block"
                    >
                      <input name="slug" value={item.slug} type="hidden" />
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
