import { notFound } from "next/navigation";
import getEpisodeBySlug from "@/fetch/getEpisodeBySlug";

import PlayerPage from "@/components/Page/PlayerPage";

export async function generateMetadata(req) {
  const params = await req.params;
  const episodeSlug = params.episode;
  const episodeData = await getEpisodeBySlug(episodeSlug);

  const { episode } = episodeData.data;

  return {
    title: `${episode.series.title} Episode ${episode.order}`,
    description: episode.series.synopsis,
    openGraph: {
      images: [
        {
          url: episode.series.banner, // Image for the open graph
        },
      ],
    },
  };
}

export default async function Episode(req) {
  const params = await req.params;
  const episodeSlug = params.episode;
  const episodeData = await getEpisodeBySlug(episodeSlug);

  if (!episodeData || episodeData.error) {
    return notFound();
  }

  return (
    <>
      <PlayerPage episodeData={episodeData} />
    </>
  );
}
