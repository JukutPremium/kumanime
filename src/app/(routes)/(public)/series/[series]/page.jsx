import Link from "next/link";
import { notFound } from "next/navigation";
import getSeriesBySlug from "@/fetch/getSeriesBySlug";
import BookmarkButton from "@/components/UI/BookmarkButton";
import Image from "next/image";

export async function generateMetadata(req) {
  const params = await req.params;
  const seriesSlug = params.series;
  const seriesData = await getSeriesBySlug(seriesSlug);

  const {
    title,
    banner,
    synopsis,
  } = seriesData.data;

  return {
    title,
    description: synopsis,
    openGraph: {
      images: [
        {
          url: banner, // Image for the open graph
        },
      ],
    },
  };
}

export default async function Series(req) {
  const params = await req.params;
  const seriesSlug = params.series;
  const seriesData = await getSeriesBySlug(seriesSlug);

  if (!seriesData || seriesData.error) {
    return notFound();
  }

  const {
    id,
    title,
    banner,
    synopsis,
    status,
    studio,
    season,
    type,
    preview,
    scheduleDay,
    genre,
    releasedOn,
    updatedOn,
    censor,
    episodes,
  } = seriesData.data;

  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Extract YouTube video ID from preview URL
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/;
    const match = url.match(regex);
    return match && match[1];
  };

  const youtubeId = getYoutubeId(preview);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            🔙 Back to Home
          </Link>

          {/* Bookmarks Link */}
          <Link
            href="/bookmarks"
            className="inline-block px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg"
          >
            📚 My Bookmarks
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Banner Image */}
          {banner && (
            <div className="flex flex-col gap-5">
              <div className="flex-shrink-0">
                <Image
                  src={banner}
                  alt={title}
                  width={318}
                  height={450}
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
              <BookmarkButton seriesData={seriesData.data} />
            </div>
          )}

          {/* Header Info */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="text-gray-400">ID:</span> {id}
              </p>
              <p>
                <span className="text-gray-400">Studio:</span> {studio}
              </p>
              <p>
                <span className="text-gray-400">Season:</span> {season}
              </p>
              <p>
                <span className="text-gray-400">Type:</span> {type}
              </p>
              <p>
                <span className="text-gray-400">Status:</span>{" "}
                <span
                  className={`${status === "ongoing" ? "text-green-400" : "text-blue-400"}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </p>
              {scheduleDay && (
                <p>
                  <span className="text-gray-400">Airs on:</span> {scheduleDay}
                </p>
              )}
              <p>
                <span className="text-gray-400">Genres:</span>{" "}
                {genre.join(", ")}
              </p>
              <p>
                <span className="text-gray-400">Released:</span>{" "}
                {formatDate(releasedOn)}
              </p>
              <p>
                <span className="text-gray-400">Last Updated:</span>{" "}
                {formatDate(updatedOn)}
              </p>
              {censor !== undefined && (
                <p>
                  <span className="text-gray-400">Censored:</span>{" "}
                  {censor ? "Yes" : "No"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-200 whitespace-pre-line">{synopsis}</p>
          </div>
        </div>

        {/* Preview Trailer */}
        {youtubeId && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Trailer</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 rounded-lg"
              ></iframe>
            </div>
          </div>
        )}

        {/* Episode List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Episodes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
            {episodes.map((ep) => (
              <Link
                key={ep.slug}
                href={`/episode/${ep.slug}`}
                className="bg-gray-700 visited:bg-purple-800 hover:bg-gray-600 px-4 py-3 rounded-lg text-center transition-colors"
              >
                Episode {ep.order}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
