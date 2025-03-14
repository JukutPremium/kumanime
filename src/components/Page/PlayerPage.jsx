import Link from "next/link";
import SelectedServer from "@/components/UI/SelectedServer";

export default function AnimeInfoPage({ episodeData }) {
  const { episode, previous, next, allEpisodes } = episodeData.data;

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 my-16">
        {/* Back to Series */}
        <div>
          <h1 className="text-2xl font-semibold mb-6 border-l-4 border-Kgreen pl-3 text-white">
            <Link
              href={`/series/${episode.series.slug}`}
              className="bg-Kgreen px-2 text-black mr-2"
            >
              {episode.series.title}
            </Link>
            Episode {episode.order}
          </h1>
          <p className="text-gray-400">
            Studio: {episode.series.studio} | {episode.series.season} |{" "}
            {episode.series.type}
          </p>
          <p className="text-gray-400">
            Released on: {new Date(episode.releasedOn).toLocaleDateString()}
          </p>
        </div>

        <SelectedServer episode={episode} next={next} previous={previous} />
      </section>

      <section className="max-w-6xl mx-auto px-6 my-12">
        <h2 className="text-2xl font-semibold mb-6 border-l-4 border-Kgreen pl-3 text-white">
          List Episode {episode.series.title}
        </h2>

        <div className="space-y-4">
          {allEpisodes.map((ep) => (
            <div
              key={ep.slug}
              className="flex items-center bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition cursor-pointer"
            >
              <div className="bg-Kgreen w-16 h-16 flex items-center justify-center text-2xl font-semibold text-black">
                {ep.order}
              </div>
              <div className="flex-1 px-4 py-3 flex justify-between items-center font-semibold text-white">
                <span className="line-clamp-1">
                  {episode.series.title} Episode {ep.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
