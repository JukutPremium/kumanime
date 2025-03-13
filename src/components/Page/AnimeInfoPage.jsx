import Image from "next/image";
import Link from "next/link";
import BookmarkButton from "@/components/UI/BookmarkButton";

export default function AnimeInfoPage({ seriesData }) {
  // Extract YouTube video ID from preview URL
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/;
    const match = url.match(regex);
    return match && match[1];
  };

  const youtubeId = getYoutubeId(seriesData.data.preview);
  return (
    <>
      <section className="relative">
        <div
          className="absolute top-0 left-0 w-full h-[700px] bg-black/50"
          style={{
            backgroundImage: `url(${seriesData.data.banner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>

        <div className="pt-16 relative">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 mt-16 mb-16">
            {/* Anime Poster */}
            <div className="w-full md:w-1/3 lg:w-5/12 flex justify-center md:justify-start">
              <div className="relative w-full">
                <Image
                  src={seriesData.data.banner}
                  alt={`${seriesData.data.title} Poster`}
                  width="900"
                  height="1200"
                  className="rounded-[20px] w-full aspect-[3/4] relative z-10"
                />
              </div>
            </div>

            {/* Anime Info */}
            <div className="w-full flex flex-col gap-4 text-center md:text-left md:w-2/3 lg:w-3/4">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {seriesData.data.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-green-300 text-green-900 px-4 py-1 rounded-full text-sm">
                  {seriesData.data.status}
                </span>
                <span className="bg-blue-300 text-blue-900 px-4 py-1 rounded-full text-sm">
                  {seriesData.data.type}
                </span>
                <span className="bg-red-300 text-red-900 px-4 py-1 rounded-full text-sm">
                  EPISODE {seriesData.data.episodes.length}
                </span>
              </div>

              {/* Studio & Season */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-blue-100 border border-blue-300 text-blue-900 px-6 py-1 rounded-full text-sm">
                  {seriesData.data.studio}
                </span>
                <span className="bg-blue-100 border border-blue-300 text-blue-900 px-6 py-1 rounded-full text-sm">
                  {seriesData.data.season}
                </span>
              </div>

              {/* Censorship & Schedule */}
              <div className="flex gap-2 justify-center md:justify-start">
                {!seriesData.data.censor && (
                  <span className="bg-green-100 border border-green-300 text-green-900 px-6 py-1 rounded-full text-sm">
                    UNCENSORED
                  </span>
                )}
                {seriesData.data.status == "ongoing" && (
                  <span className="bg-blue-100 border border-blue-300 text-blue-900 px-6 py-1 rounded-full text-sm">
                    Uploaded On {seriesData.data.scheduleDay}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 line-clamp-6">
                {seriesData.data.synopsis}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {/* Genre */}
                {seriesData.data.genre.map((genre, idx) => {
                  const pastelColors = [
                    "bg-red-200 text-red-800",
                    "bg-blue-200 text-blue-800",
                    "bg-green-200 text-green-800",
                    "bg-yellow-200 text-yellow-800",
                    "bg-purple-200 text-purple-800",
                    "bg-pink-200 text-pink-800",
                    "bg-indigo-200 text-indigo-800",
                    "bg-teal-200 text-teal-800",
                  ];

                  const bgColor = pastelColors[idx % pastelColors.length];

                  return (
                    <span
                      key={idx}
                      className={`inline-block px-2 py-1 rounded-2xl text-xs font-bold ${bgColor}`}
                    >
                      {genre}
                    </span>
                  );
                })}
              </div>

              {/* Bookmark Button */}
              <BookmarkButton seriesData={seriesData.data} />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 my-8">
        <div className="bg-gray-700  w-full  rounded-lg flex items-center justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-64 rounded-lg"
          ></iframe>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 my-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-3 text-white">
          List Episode {seriesData.data.title}
        </h2>

        <div className="space-y-4">
          {seriesData.data.episodes.map((episode) => (
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/episode/${episode.slug}`}
              key={episode.id}
              className="flex items-center bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition cursor-pointer"
            >
              <div className="bg-green-500 w-16 h-16 flex items-center justify-center text-2xl font-bold text-white">
                {episode.order}
              </div>
              <div className="flex-1 px-4 py-3 flex justify-between items-center text-white">
                <span>
                  {seriesData.data.title} Episode {episode.order}
                </span>
                <span className="text-gray-400">{episode.releasedAt}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
